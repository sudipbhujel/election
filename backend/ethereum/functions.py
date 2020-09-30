from .contract import contract


def manager():
    return contract.functions.manager().call()


def state():
    return contract.functions.state().call()


def total_voter():
    return contract.functions.totalVoter().call()


def total_candidate():
    return contract.functions.totalCandidate().call()


def vote_dropped():
    return contract.functions.voteDropped().call()


def candidate(address):
    """
    Returns candidate credentials.

    Parameters:
        address: address

    Returns:
        list of three values addresss (str), is_candidate (bool),
        total_vote_count (int).
    """
    return contract.functions.candidates(address).call()


def voter(address):
    """
    Returns voter credentials.

    Parameters:
        address: address

    Returns:
        list of three values addresss (str), is_voter (bool),
        voted (bool).
    """
    return contract.functions.voters(address).call()
