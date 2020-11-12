import json

from web3 import Web3

from configure import HOST_PRIVATE_KEY, INFURA_PROVIDER


class DeployContract:
    """
    Deploys the contract in the rinkeby test network.

    Parameters
    ----------
        provider: infora provider
        abi: contract abi code
        byte_code: contract byte code
        private_key: private key 

    Returns
    -------
        address: contract address

    """

    def __init__(self, provider, abi, byte_code, private_key):
        self.w3 = Web3(Web3.HTTPProvider(provider))
        self.abi = abi
        self.byte_code = byte_code
        self.private_key = private_key

    def deploy(self):
        """
        Deploys the contract returns contract address.
        """
        instance = self.w3.eth.contract(abi=self.abi, bytecode=self.byte_code)
        account = self.w3.eth.account.privateKeyToAccount(self.private_key)

        construct_txn = instance.constructor().buildTransaction({
            'from': account.address,
            'nonce': self.w3.eth.getTransactionCount(account.address),
            'gas': 2000000,
            'gasPrice': self.w3.eth.gasPrice
        })

        signed = account.signTransaction(construct_txn)

        tx_hash = self.w3.eth.sendRawTransaction(signed.rawTransaction)

        txn_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)

        address = txn_receipt['contractAddress']
        return address


# Load json file
with open('build/election.json') as file:
    data = json.load(file)


dc = DeployContract(
    INFURA_PROVIDER, data['abi'], data['byte_code'], HOST_PRIVATE_KEY)

address = dc.deploy()

# Save contract address to file
with open('ADDRESS', 'w') as file:
    file.write(address)
    print('\033[92m' + '✔ Contract Address is saved to ADDRESS file.' + '\033[0m')

print(f'Contract is deployed to: {address}')
