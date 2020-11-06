from .w3 import w3


def create_account():
    """
    Creates an account and return it.
    """
    account = w3.eth.account.create()
    return account


def get_address(private_key):
    """
    Returns account address.
    """
    account = w3.eth.account.privateKeyToAccount(private_key)
    return account.address
