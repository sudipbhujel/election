from .contract import contract
from .w3 import w3


class Voter:
    """
    Performs voter operations.
    """

    def __init__(self, private_key):
        """
        Instantiates Voter class.

        Parameters
        ----------
            private_key: voter private key
        """
        self.w3 = w3
        self.contract = contract
        self.private_key = private_key
        self.account = w3.eth.account.privateKeyToAccount(self.private_key)

    def do_vote(self, address):
        """
        Votes the candidate.

        Parameters
        ----------
            address: candidate address

        Returns
        -------
            receipt: dictionary transaction receipt
        """
        construct_txn = self.contract.functions\
            .doVote(address).buildTransaction({
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


# # Load json file
# with open('build/election.json') as file:
#     contract_interface = json.load(file)

# # Load contract address
# with open('ADDRESS', 'r') as file:
#     contract_address = file.read()

# w3 = Web3(Web3.HTTPProvider(INFURA_PROVIDER))

# contract = w3.eth.contract(address=contract_address,
#                            abi=contract_interface['abi'])

# voter = Voter(
#     w3, contract, HOST_PRIVATE_KEY)

# receipt = voter.do_vote('0x86379E23B808Cdc2104229A2738F230520cC4768')
# pprint.pprint(receipt)
