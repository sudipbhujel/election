from PIL import Image
from pyzbar.pyzbar import decode


def decode_qr(image):
    """
    Returns dictionary with key, value pair

    Parameters
    ----------
        image: qrcode image

    Return
    ------
        dict: key value pair

    """
    d = decode(Image.open(image))
    data = d[0].data.decode('ascii')
    data = data.replace(':', '').split()
    dict = {data[i]: data[i+1] for i in range(0, len(data), 2)}
    return dict
