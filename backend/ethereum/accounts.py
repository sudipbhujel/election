from .w3 import w3


def create_account():
    """
    Creates an account and return it.
    """
    account = w3.eth.account.create()
    return account
