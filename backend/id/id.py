import uuid
import os

import qrcode
from PIL import Image, ImageDraw, ImageFont

from django.conf import settings


class ID:
    """
    Make an ID card for voters.
    """

    logo = Image.open(os.path.join(
        settings.BASE_DIR, 'id', 'logo.jpg'), mode='r')

    def __init__(self, citizenship_number, id, email, first_name,
                 last_name, dob, address, private_key):
        self.citizenship_number = citizenship_number
        self.id = f'ID {id}'
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.dob = dob
        self.address = address
        self.private_key = private_key

    @property
    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'

    def get_qrcode(self, w, h):
        """
        Returns Pillow Image object.

        Parameters
        ----------
            w: width
            h: height

        Return
        ------
            object: Image object
        """
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )

        qr.add_data(
            f'private_key: {self.private_key} \ncitizenship_number: {self.citizenship_number}')
        qr.make(fit=True)

        img = qr.make_image(fill_color='black', back_color='white')

        img.thumbnail((w, h), Image.ANTIALIAS)

        return img

    def font(self, size, face='arial.ttf'):
        """
        Returns ImageFont instance.

        Parameters
        ----------
            size: font size
            face: Default font face
                'arial.ttf'

        Returns
        -------
            instance: an ImageFont instance
        """
        return ImageFont.truetype(f'/backend/id/{face}', size=size)

    def textsize(self, obj, msg, font):
        """
        Returns text size in tuple (w, h).

        Parameters
        ----------
            obj: ImageDraw object
            msg: message text
            font: ImageFont instance

        Returns
        -------
            (w, h): width and height tuple
        """
        w, h = obj.textsize(msg, font=font)
        return (w, h)

    def personal_info_section(self, obj, w, h, size,
                              face='arial.ttf', color='rgb(0,0,0)'):
        """
        Returns draw object.

        Parameters
        ----------
            obj: ImageDraw object
            w: left margin
            h: image initiation height
            size: font size
            face: font face Default 'Arial'
            color: color default 'rgb(0,0,,)'

        Returns
        -------
            object: Draw object
        """
        h = h + 30
        obj.text((w, h), f'Citizenship No.: {self.citizenship_number}',
                 fill=color, font=self.font(size, face))
        h = h + 30
        obj.text((w, h), f'Name: {self.get_full_name}',
                 fill=color, font=self.font(size, face))
        h = h + 30
        obj.text((w, h), f'Email: {self.email}',
                 fill=color, font=self.font(size, face))
        h = h + 30
        obj.text((w, h), f'Address: {self.address}',
                 fill='rgb(0,0,0)', font=self.font(size, face))
        h = h + 30
        obj.text((w, h), f'DOB: {self.dob}',
                 fill='rgb(0,0,0)', font=self.font(size, face))

        return obj

    def get_card(self):
        """
        Returns Image instance of card.
        """
        W, H = (500, 270)
        title = 'ELECTION COMMISSION'
        address = 'Kapan, Kathmandu'

        image = Image.new('RGB', (W, H), (255, 255, 255))
        draw = ImageDraw.Draw(image)

        # Border
        draw.line([(10, 10), (W-10, 10), (W-10, H-10),
                   (10, H-10), (10, 10)], fill='black')

        # Logo
        image.paste(self.logo, (40, 20))

        # Title
        w, h = self.textsize(draw, title, self.font(25))
        draw.text(((W-w)/2, 20), title, fill='rgb(0,0,0)', font=self.font(25))

        h = h + 25
        # Address
        w, _ = self.textsize(draw, address, self.font(20))
        draw.text(((W-w)/2, h), address,
                  fill='rgb(0,0,0)', font=self.font(20))

        h = h + 30
        # ID Number
        w, _ = self.textsize(
            draw, self.id, self.font(15, 'FiraCode-Medium.ttf'))
        draw.text((W-w-15, h), self.id, fill='rgb(0,0,0)',
                  font=self.font(15, 'FiraCode-Medium.ttf'))

        # Information
        draw = self.personal_info_section(draw, 20, h, 16)

        # QRcode
        qr = self.get_qrcode(150, 150)

        image.paste(qr, (W-200, H-160))

        return image
