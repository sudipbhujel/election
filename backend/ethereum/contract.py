import json

from .w3 import w3

# Load json file
with open('build/election.json') as file:
    contract_interface = json.load(file)

# Load contract address
with open('ADDRESS', 'r') as file:
    contract_address = file.read()

contract = w3.eth.contract(address=contract_address,
                           abi=contract_interface['abi'])
