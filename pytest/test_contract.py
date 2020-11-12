import pytest

from web3 import (
    EthereumTesterProvider,
    Web3,
)
import web3
from web3 import manager


@pytest.fixture
def tester_provider():
    return EthereumTesterProvider()


@pytest.fixture
def eth_tester(tester_provider):
    return tester_provider.ethereum_tester


@pytest.fixture
def w3(tester_provider):
    return Web3(tester_provider)


@pytest.fixture
def manager_address(eth_tester):
    return eth_tester.get_accounts()[0]


@pytest.fixture
def election_contract(eth_tester, manager_address, w3):
    deploy_address = manager_address

    abi = """[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_candidate",
          "type": "address"
        }
      ],
      "name": "candidateAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "voteDone",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "voteEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "voteStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "voterAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_candidateAddress",
          "type": "address"
        }
      ],
      "name": "addCandidate",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voterAddress",
          "type": "address"
        }
      ],
      "name": "addVoter",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "address",
          "name": "candidateAddress",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isCandidate",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "totalVoteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_candidateAddress",
          "type": "address"
        }
      ],
      "name": "doVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endVote",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "manager",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_voterAddress",
          "type": "address"
        }
      ],
      "name": "removeVoter",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startVote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "state",
      "outputs": [
        {
          "internalType": "enum Election.State",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalCandidate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalVoter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voteDropped",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "internalType": "address",
          "name": "voterAddress",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isVoter",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "voted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]"""

    bytecode = """608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600460006101000a81548160ff0219169083600281111561007057fe5b02179055506000600181905550600060028190555060006003819055506118868061009c6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806386c1ff681161008c578063b922394611610066578063b922394614610332578063c19d93fb14610350578063c7f0351614610379578063f4ab9adf146103bd576100cf565b806386c1ff68146101da5780638ab66a9014610234578063a3ec138d146102b2576100cf565b80631812dab4146100d45780633acd75f8146100f2578063481c6a75146101605780634c0a6af0146101945780636332abc91461019e5780638594d7bf146101bc575b600080fd5b6100dc61042b565b6040518082815260200191505060405180910390f35b6101346004803603602081101561010857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610431565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b610168610863565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61019c610887565b005b6101a6610a37565b6040518082815260200191505060405180910390f35b6101c4610a3d565b6040518082815260200191505060405180910390f35b61021c600480360360208110156101f057600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610a43565b60405180821515815260200191505060405180910390f35b6102766004803603602081101561024a57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610dd9565b604051808473ffffffffffffffffffffffffffffffffffffffff1681526020018315158152602001828152602001935050505060405180910390f35b6102f4600480360360208110156102c857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610e30565b604051808473ffffffffffffffffffffffffffffffffffffffff16815260200183151581526020018215158152602001935050505060405180910390f35b61033a610e94565b6040518082815260200191505060405180910390f35b61035861104c565b6040518082600281111561036857fe5b815260200191505060405180910390f35b6103bb6004803603602081101561038f57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061105f565b005b6103ff600480360360208110156103d357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061143b565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60025481565b60008080600281111561044057fe5b600460009054906101000a900460ff16600281111561045b57fe5b146104ce576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f456c656374696f6e207068617365207265737472696374696f6e2e000000000081525060200191505060405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461058f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4d616e61676572206f6e6c792068617320706572736d697373696f6e2e00000081525060200191505060405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff1615610652576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f43616e64696461746520616c726561647920726567697374657265642e00000081525060200191505060405180910390fd5b60405180606001604052808473ffffffffffffffffffffffffffffffffffffffff1681526020016001151581526020016000815250600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff02191690831515021790555060408201518160010155905050600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff16610799576107978361143b565b505b6002600081548092919060010191905055507f0bb71f709aa777936ac5c8fd7ffcc9c770345379e194e07e7dc26fe3c7416be383604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16915050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600281111561089557fe5b600460009054906101000a900460ff1660028111156108b057fe5b14610923576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f456c656374696f6e207068617365207265737472696374696f6e2e000000000081525060200191505060405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146109e4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4d616e61676572206f6e6c792068617320706572736d697373696f6e2e00000081525060200191505060405180910390fd5b6001600460006101000a81548160ff02191690836002811115610a0357fe5b02179055507fd0dc01800a369fef30d3fced5275b8b916549867622e79efca5245c479fda4ea60405160405180910390a150565b60015481565b60035481565b600080806002811115610a5257fe5b600460009054906101000a900460ff166002811115610a6d57fe5b14610ae0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f456c656374696f6e207068617365207265737472696374696f6e2e000000000081525060200191505060405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ba1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4d616e61676572206f6e6c792068617320706572736d697373696f6e2e00000081525060200191505060405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff16610c63576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260108152602001807f566f746572206e6f742065786973742e0000000000000000000000000000000081525060200191505060405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556000820160146101000a81549060ff02191690556000820160156101000a81549060ff02191690555050600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff1615610dcf57600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556000820160146101000a81549060ff0219169055600182016000905550505b6001915050919050565b60066020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16908060010154905083565b60056020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16908060000160159054906101000a900460ff16905083565b60006001806002811115610ea457fe5b600460009054906101000a900460ff166002811115610ebf57fe5b14610f32576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f456c656374696f6e207068617365207265737472696374696f6e2e000000000081525060200191505060405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610ff3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4d616e61676572206f6e6c792068617320706572736d697373696f6e2e00000081525060200191505060405180910390fd5b6002600460006101000a81548160ff0219169083600281111561101257fe5b02179055507f0deeca6c5a4a24936ed5053feb119562545a36119b158ecd0bb902a689be2d6660405160405180910390a160035491505090565b600460009054906101000a900460ff1681565b600180600281111561106d57fe5b600460009054906101000a900460ff16600281111561108857fe5b146110fb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f456c656374696f6e207068617365207265737472696374696f6e2e000000000081525060200191505060405180910390fd5b60001515600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160159054906101000a900460ff161515146111a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252602a815260200180611827602a913960400191505060405180910390fd5b600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff16611269576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260138152602001807f55736572206d75737420626520766f7465722e0000000000000000000000000081525060200191505060405180910390fd5b600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff1661132b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260168152602001807f55736572206d7573742062652063616e6469646174650000000000000000000081525060200191505060405180910390fd5b6001600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160156101000a81548160ff021916908315150217905550600660008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600101600081548092919060010191905055506003600081548092919060010191905055507f55c65cf9526efdf6c2252fe9757889dbd93e10172cad0f2edb1df619c88dbf7d33604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15050565b60008080600281111561144a57fe5b600460009054906101000a900460ff16600281111561146557fe5b146114d8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601b8152602001807f456c656374696f6e207068617365207265737472696374696f6e2e000000000081525060200191505060405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611599576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f4d616e61676572206f6e6c792068617320706572736d697373696f6e2e00000081525060200191505060405180910390fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff161561165c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f566f74657220616c726561647920726567697374657265642e0000000000000081525060200191505060405180910390fd5b60405180606001604052808473ffffffffffffffffffffffffffffffffffffffff16815260200160011515815260200160001515815250600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff02191690831515021790555060408201518160000160156101000a81548160ff0219169083151502179055509050506001600081548092919060010191905055507fb9e5f9042e6c6eb94817f660cfa81afea9585e59d72bfc3348a2305cbd33e13383604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a1600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691505091905056fe54686520766f7465722077686f20686173206e6f7420766f7465642063616e206361737420766f74652ea2646970667358221220a5bc65f2b5bbf290d2fc0d728993f5f83976222e90a64a2bd81efbc7688b3a8764736f6c63430007010033"""

    ElectionContract = w3.eth.contract(
        abi=abi, bytecode=bytecode)

    tx_hash = ElectionContract.constructor().transact({
        'from': deploy_address,
    })

    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    return ElectionContract(tx_receipt.contractAddress)

def add_candidate(w3, address, manager_address, election_contract):
  """
  Adds candidate.
  """
  tx_hash = election_contract.functions.addCandidate(address).transact({
        'from': manager_address,
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
  receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180) 
  return receipt

def add_voter(w3, address, manager_address, election_contract):
  """
  Adds candidate.
  """
  tx_hash = election_contract.functions.addVoter(address).transact({
        'from': manager_address,
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
  receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180) 
  return receipt


def test_add_voter_manager(w3, manager_address, election_contract):
    """
    Test add voter by manager.
    """
    tx_hash = election_contract.functions.addVoter(w3.eth.accounts[0]).transact({
        'from': manager_address,
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    hw = election_contract.functions.voters(w3.eth.accounts[0]).call()

    assert hw[0] == w3.eth.accounts[0]


def test_add_voter_other(w3, manager_address, election_contract):
    """
    Test add voter other user.
    """
    tx_hash = election_contract.functions.addVoter(w3.eth.accounts[1]).transact({
        'from': w3.eth.accounts[1],
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    assert receipt['status'] == 0


def test_add_candidate_manager(w3, manager_address, election_contract):
    """
    Test add candidate by manager.
    """
    tx_hash = election_contract.functions.addCandidate(w3.eth.accounts[0]).transact({
        'from': manager_address,
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    hw = election_contract.functions.candidates(w3.eth.accounts[0]).call()

    assert hw[0] == w3.eth.accounts[0]


def test_add_candidate_other(w3, manager_address, election_contract):
    """
    Test add candidate by other user.
    """
    tx_hash = election_contract.functions.addCandidate(w3.eth.accounts[1]).transact({
        'from': w3.eth.accounts[1],
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    assert receipt['status'] == 0


def test_start_vote_phase_manager(w3, manager_address, election_contract):
    """
    Test start vote phase by manager.
    """
    tx_hash = election_contract.functions.startVote().transact({
        'from': manager_address,
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    hw = election_contract.functions.state().call()

    assert hw == 1


def test_start_vote_phase_other(w3, manager_address, election_contract):
    """
    Test start vote phase by manager.
    """
    tx_hash = election_contract.functions.startVote().transact({
        'from': w3.eth.accounts[1],
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    assert receipt['status'] == 0

def test_remove_voter_manager(w3, manager_address, election_contract):
    """
    Test remove voter by manager.
    """
    receipt = add_candidate(w3, w3.eth.accounts[1], manager_address, election_contract)

    assert receipt['status'] == 1

    tx_hash = election_contract.functions.removeVoter(w3.eth.accounts[1]).transact({
        'from': manager_address,
        'gas': 1000000,
        'gasPrice': w3.eth.gasPrice
    })
    receipt = w3.eth.waitForTransactionReceipt(tx_hash, 180)

    print(receipt['status'])

    hw = election_contract.functions.voters(w3.eth.accounts[1]).call()

    assert hw[1] == False
