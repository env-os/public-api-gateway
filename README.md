# Public Api Gateway

Service for data aggregation and authentication.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
nodeJS
```

### Installing

1. Install npm project dependecies

```
npm install
```

## Deployment

1. Set environments variables
```
PORT = // the micro-service port
MQTTPUBLISHER_MICROSERVICE_URL = // url of mqtt-publisher microservice
AREAS_MICROSERVICE_URL = // url of areas microservice
DEVICES_MICROSERVICE_URL = // url of devices microservice
USERS_MICROSERVICE_URL = // url of users microservice
```
3. Compile Typescript
```
npm run tsc
```
4. Run micro-service
```
node build/app.js
```

## Built With

* [NodeJS](https://nodejs.org/it/)
* [Express](https://expressjs.com/it/)
* [TypeScript](https://github.com/microsoft/TypeScript)

## License

This project is licensed under the GNU License - see the [LICENSE.md](LICENSE.md) file for details
