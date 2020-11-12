import json
import pprint

from web3 import Web3
from web3 import manager

from configure import HOST_PRIVATE_KEY, INFURA_PROVIDER


class Manager:
    """
    Performs manager operations.
    """

    def __init__(self, w3, contract, private_key):
        """
        Instantiates Manager class.

        Parameters
        ----------
            w3: Web3 instance
            contract: contract instance
            private_key: voter private key
        """
        self.w3 = w3
        self.contract = contract
        self.private_key = private_key
        self.account = w3.eth.account.privateKeyToAccount(self.private_key)

    def add_candidate(self, address):
        """
        Adds the candidate with address.

        Parameters
        ----------
            address: candidate address

        Returns
        -------
            receipt: dictionary transaction receipt 
        """
        construct_txn = self.contract.functions.addCandidate(address).buildTransaction({
            'from': self.account.address,
            'nonce': self.w3.eth.getTransactionCount(self.account.address),
            'gas': 1000000,
            'gasPrice': self.w3.eth.gasPrice
        })

        signed = self.account.signTransaction(construct_txn)
        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
        receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        return dict(receipt)

    def add_voter(self, address):
        """
        Adds the voter with address.

        Parameters
        ----------
            address: voter address

        Returns
        -------
            receipt: dictionary transaction receipt 
        """
        construct_txn = self.contract.functions.addVoter(address).buildTransaction({
            'from': self.account.address,
            'nonce': self.w3.eth.getTransactionCount(self.account.address),
            'gas': 1000000,
            'gasPrice': self.w3.eth.gasPrice
        })

        signed = self.account.signTransaction(construct_txn)
        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
        receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        return dict(receipt)

    def remove_voter(self, address):
        """
        Removes voter.

        Parameters
        ----------
            address: address to remove

        Returns
        -------
            receipt: dictionary transaction receipt
        """
        construct_txn = self.contract.functions.removeVoter(address).buildTransaction({
            'from': self.account.address,
            'nonce': self.w3.eth.getTransactionCount(self.account.address),
            'gas': 1000000,
            'gasPrice': self.w3.eth.gasPrice
        })

        signed = self.account.signTransaction(construct_txn)
        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
        receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        return dict(receipt)

    def start_vote(self):
        """
        Starts a voting phase.

        Returns
        -------
            receipt: dictionary transaction receipt
        """
        construct_txn = self.contract.functions.startVote().buildTransaction({
            'from': self.account.address,
            'nonce': self.w3.eth.getTransactionCount(self.account.address),
            'gas': 1000000,
            'gasPrice': self.w3.eth.gasPrice
        })

        signed = self.account.signTransaction(construct_txn)
        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
        receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        return dict(receipt)

    def end_vote(self):
        """
        Ends a voting phase.

        Returns
        -------
            receipt: dictionary transaction receipt
        """
        construct_txn = self.contract.functions.endVote().buildTransaction({
            'from': self.account.address,
            'nonce': self.w3.eth.getTransactionCount(self.account.address),
            'gas': 1000000,
            'gasPrice': self.w3.eth.gasPrice
        })

        signed = self.account.signTransaction(construct_txn)
        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
        receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        return dict(receipt)


# Load json file
with open('build/election.json') as file:
    contract_interface = json.load(file)

# Load contract address
with open('ADDRESS', 'r') as file:
    contract_address = file.read()

w3 = Web3(Web3.HTTPProvider(INFURA_PROVIDER))

contract = w3.eth.contract(address=contract_address,
                           abi=contract_interface['abi'])

manager = Manager(w3, contract, HOST_PRIVATE_KEY)

receipt = manager.add_candidate('0x86379E23B808Cdc2104229A2738F230520cC4768')

pprint.pprint(receipt)
