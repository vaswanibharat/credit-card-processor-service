# Credit Card Procesor Service

This application exposes REST API endpoints to add credit card accounts and view them. All credit cards account details are stored in-memory DB (Redis).

# Technology Stack
The following technologies have been used in this project:
1. Microservice - Node JS Express
2. in memory DB - Redis

This service support API key authenticate the validate each request and requires connectivity to AWS Secret Manager in order to fetch API keys when NODE_ENV variable is production otherwise it will read the api key from .env file.

# Prerequisties to start the app

- Create a `.env` file and copy contents (and update as necessary) from `.env.sample` file.

## Running app in HTTP mode
- Set HTTPS_SERVER to false in .env file to run application in HTTP mode.

## Running app in HTTPS mode
- Set HTTPS_SERVER to true in .env file to run application in HTTPS mode.
- When running in HTTPS mode, it picks up the HTTPS_KEY and HTTPS_CERT from the location defined CERT_LOCATION in .env file.

## Run below command to start redis on local

docker network create --driver=bridge --subnet-192.168.0.0/16 redis_bridge
docker-compose up


## Swagger Specification

The  swagger specification for the REST APIs is shared with this project.

## Scripts

Install:

npm install

Run unit tests:

npm run test:unit

Generate test coverage report:

npm run test:coverage

Start Server:

npm start

Access the service at http://localhost:`PORT`/