import json
import os
import shutil

from solcx import compile_source

from configure import (CONTRACT_INTERFACE_FILE_NAME,
                       CONTRACT_SOURCE_PATH
                       )


def compile_source_file(file_path):
    with open(file_path, 'r') as f:
        source = f.read()

    return compile_source(source)


compiled_sol = compile_source_file(CONTRACT_SOURCE_PATH)

contract_id, contract_interface = compiled_sol.popitem()

interface = {
    'abi': contract_interface['abi'],
    'byte_code': contract_interface['bin']
}


def save_to_json(interface, dir='build',
                 filename='election.json'):
    """
    Saves interface to designated folder.

    Parameters
    ----------
        interface: dictionary with abi and byte_code as keys
        dir: dir name to save json
        filename: file name for json

    Returns
    -------
        boolean: True if operation succeed
    """
    if os.path.isdir(dir):
        shutil.rmtree(dir)
    os.makedirs(dir)
    with open(os.path.join(dir, filename), 'w') as file:
        json.dump(interface, file, indent=2)
    print('✔ Compiled Successfully!')
    return True


save_to_json(interface, filename=CONTRACT_INTERFACE_FILE_NAME)
