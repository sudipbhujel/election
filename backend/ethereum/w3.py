from web3 import Web3

from .configure import INFURA_PROVIDER

w3 = Web3(Web3.HTTPProvider(INFURA_PROVIDER))
