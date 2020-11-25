## Election

This app has some similarity with this repo:

🗼 https://github.com/sudipbhujel/election-v3.git

📺 [Watch Demo Here](https://youtu.be/FKLZwQUb98k)

**Features**

    ✅ Face Identification
    ✅ Two factor authentication
    ✅ Voting with blockchain network
    ✅ Sending an email runs out of main thread therefore speeds up
    ✅ Client and Server side form validation 

**Technology used**

    ✅ Django
    ✅ Django Rest Framework
    ✅ JWT Authentication
    ✅ Postgresql
    ✅ Celery
    ✅ Redis
    ✅ Reactjs
    ✅ Redux Saga
    ✅ Styled Components
    etc...

**Getting Started**

This project uses `docker` technology.

- Clone the repo.
- Make `.env` file.
  ```
  SECRET_KEY=YOUR_SECRET_KEY
  DB_HOST=db
  DB_NAME=election
  DB_USER=postgres
  DB_PASS=supersecretpassword
  POSTGRES_DB=election
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=supersecretpassword
  INFURA_PROVIDER=https://rinkeby.infura.io/v3/API_KEY
  HOST_PRIVATE_KEY=ETHEREUM_ACCOUNT_PRIVATE_KEY
  ```
- Make `configure.py` file in `/backend/ethereum/`.

  ```python
  import os

  CONTRACT_SOURCE_PATH = 'Election.sol'
  CONTRACT_INTERFACE_FILE_NAME = 'election.json'
  INFURA_PROVIDER = os.environ.get('INFURA_PROVIDER')
  HOST_PRIVATE_KEY = os.environ.get('HOST_PRIVATE_KEY')
  ```

- Build the project with `docker-compose build`
- Run the project with `docker-compose up`

**Commands**
 ```bash
 ## Backend
 # Accessing Django Shell
 docker-compose run --rm app sh -c "python manage.py shell"

 # Creating a new application
 docker-compose run --rm app sh -c "python manage.py startapp app_name"

 # Make migration
  docker-compose run --rm app sh -c "python manage.py makemigrations"

  ## Frontend
  # For build react project
  docker-compose run --rm frontend-react sh -c "yarn build"
 ```

📝 **NOTE:**
You can checkout `ethereum` branch to depoly the contract in test-net.
