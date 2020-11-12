import json
import os
import shutil
from web3 import Web3

from solcx import compile_source

from configure import (CONTRACT_INTERFACE_FILE_NAME,
                       CONTRACT_SOURCE_PATH,
                       HOST_PRIVATE_KEY,
                       INFURA_PROVIDER
                       )


class Contract:
    """
    A Contract class that compiles and deploys to the infura.io provider.
    """

    def __init__(self, contract_interface_filename,
                 contract_source_path, provider, private_key):
        """
        Instantiates Contract class.

        Parameters
        ----------
            contract_interface_filename: contract interface filename to \
                                        be saved (json)
            contract_source_path: contract source path (Solidity code)
            provider: provider to deploy contract
            private_key: private key from which contract is deployed
        """
        self.contract_interface_filename = contract_interface_filename
        self.contract_source_path = contract_source_path
        self.w3 = Web3(Web3.HTTPProvider(provider))
        self.private_key = private_key

    @property
    def load_interface_json(self):
        """
        Loads interface json.
        """
        with open('build/election.json') as file:
            self.data = json.load(file)

    @property
    def _compile_source_file(self):
        with open(self.contract_source_path, 'r') as f:
            source = f.read()

        return compile_source(source)

    @property
    def _get_interface(self):
        """
        Compiles contract and returns interface dictionary.
        """
        compiled_sol = self._compile_source_file
        _, contract_interface = compiled_sol.popitem()

        interface = {
            'abi': contract_interface['abi'],
            'byte_code': contract_interface['bin']
        }
        return interface

    def save_to_json(self, dir='build'):
        """
        Saves contract interface to json file.
        """
        if os.path.isdir(dir):
            shutil.rmtree(dir)
        os.makedirs(dir)
        with open(os.path.join(dir, self.contract_interface_filename), 'w') as file:
            json.dump(self._get_interface, file, indent=2)
        print('✔ Compiled Successfully!')
        return True

    def deploy(self):
        """
        Deploys the contract returns transaction receipt. \
        If the deploy trasaction is successful then it saves \
        address to ADDRESS file.

        Return
        ------
            receipt: transaction dictionary receipt 
        """
        self.load_interface_json
        instance = self.w3.eth.contract(
            abi=self.data['abi'], bytecode=self.data['byte_code'])
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

        if txn_receipt['status']:
            # Save contract address to file
            with open('ADDRESS', 'w') as file:
                file.write(address)
                print(
                    '\033[92m' + '✔ Contract Address is saved to ADDRESS file.' + '\033[0m')

            print(f'Contract is deployed to: {address}')

        return dict(txn_receipt)


contract = Contract(CONTRACT_INTERFACE_FILE_NAME, CONTRACT_SOURCE_PATH,
                    INFURA_PROVIDER, HOST_PRIVATE_KEY)

contract.save_to_json()
receipt = contract.deploy()
print(receipt)
