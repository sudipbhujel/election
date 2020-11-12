## Instructions to get started

1. Clone the project.
2. Make `configure.py` file.
3. Add the following variables:

```python
CONTRACT_SOURCE_PATH = 'Election.sol'
CONTRACT_INTERFACE_FILE_NAME = 'election.json'
INFURA_PROVIDER = 'https://rinkeby.infura.io/v3/API_KEY' # Update this field
HOST_PRIVATE_KEY = 'ETHERUEM_ACCOUNT_PRIVATE_KEY' # Update this field
```

4. `python compile.py` to compile the `Election` contract.
5. `python deploy_contract.py` to deploy the contract into test network.

Notes:

- All the tests resides into pytest folder.
- The compiled file resides into the build folder.
- The deployed address will be resides into `ADDRESS` file.
- The program flow is: `CONFIGURE` => `COMPILE` => `DEPLOY`
