import json
import os

from .w3 import w3

# Load json file
with open('/backend/ethereum/build/election.json') as file:
    contract_interface = json.load(file)

# Load contract address
contract_address = os.environ.get('CONTRACT_ADDRESS')

contract = w3.eth.contract(address=contract_address,
                           abi=contract_interface['abi'])
