from .w3 import w3
from .contract import contract
from .configure import HOST_PRIVATE_KEY


class Manager:
    """
    Performs manager operations.
    """

    def __init__(self, *args, **kwargs):
        """
        Instantiates Manager class.
        """
        self.w3 = w3
        self.contract = contract
        self.private_key = HOST_PRIVATE_KEY
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
        construct_txn = self.contract.functions\
            .addCandidate(address).buildTransaction({
                'from': self.account.address,
                'nonce':
                self.w3.eth.getTransactionCount(self.account.address),
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
        construct_txn = self.contract.functions\
            .addVoter(address).buildTransaction({
                'from': self.account.address,
                'nonce':
                self.w3.eth.getTransactionCount(self.account.address),
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
        construct_txn = self.contract.functions\
            .removeVoter(address).buildTransaction({
                'from': self.account.address,
                'nonce':
                self.w3.eth.getTransactionCount(self.account.address),
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
        construct_txn = self.contract.functions\
            .startVote().buildTransaction({
                'from': self.account.address,
                'nonce':
                self.w3.eth.getTransactionCount(self.account.address),
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
        construct_txn = self.contract.functions\
            .endVote().buildTransaction({
                'from': self.account.address,
                'nonce':
                self.w3.eth.getTransactionCount(self.account.address),
                'gas': 1000000,
                'gasPrice': self.w3.eth.gasPrice
            })

        signed = self.account.signTransaction(construct_txn)
        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)
        receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        return dict(receipt)
