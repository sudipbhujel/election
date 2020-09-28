from email.mime.image import MIMEImage

from celery import shared_task
from django.core.mail import EmailMultiAlternatives

from core.models import Profile

from .utils import base64_decode


@shared_task
def id_generated(profile_id, im):
    """
    Task to send an e-mail with ID image attached.
    """
    # Prepare Image
    image = base64_decode(im)

    profile = Profile.objects.get(id=profile_id)
    subject = 'ID card'
    html_message = f"""
            <html>
                <body>
                    <h3>Dear {profile.get_full_name},</h3>
                    <h4>Your Voter ID card is ready, Please save it.
                    </h4>
                    <p>
                    Please, don't share this card. Noone from this 
                    organization will ask about this credentials.<br>
                    <img src="cid:embedded_image" alt="ID Card"/>
                    </p>
                </body>
            </html>
        """

    email = EmailMultiAlternatives(subject,
                                   html_message,
                                   'admin@election.com',
                                   [profile.user.email])
    email.attach_alternative(html_message, "text/html")
    email.content_subtype = 'html'
    email.mixed_subtype = 'related'
    image = MIMEImage(image, 'jpg')
    image.add_header('Content-ID', "<embedded_image>")
    image.add_header('Content-Disposition', "inline",
                     filename=f'ID{profile.id}.jpg')
    email.attach(image)
    email.send()
    return True
