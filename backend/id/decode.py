import os

from django.conf import settings
from PIL import Image
from pyzbar.pyzbar import decode


def decode_qr(filename='test_card.jpeg'):
    """
    Returns dictionary with key, value pair

    Parameters
    ----------
        filename: qrcode file path

    Return
    ------
        dict: key value pair

    """
    path = os.path.join(settings.BASE_DIR, 'id', filename)
    print(path)
    d = decode(Image.open(path))
    data = d[0].data.decode('ascii')
    data = data.replace(':', '').split()
    dict = {data[i]: data[i+1] for i in range(0, len(data), 2)}
    return dict
