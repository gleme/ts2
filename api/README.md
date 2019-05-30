# ts2-api

This is an express api for a initial setup on TypeORM, Expressjs, and Mocha Tests. It also includes TDD workflow and QA linting rules for Scrum Team 2 - Physician Segment.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

What things you need to install the software and how to install them

-   Node v8.14+
-   NPM (Node Package Manager)
-   MySQL Server database schema pre-configured
-   A .env file next to package.json with all the required environment variables set

### Installing & Running

Clone the repository, go to project directory, install dependencies and start on development mode:

```
$ git clone https://github.com/gleme/express-boilerplate

$ cd express-boilerplate
```

Set enviroment variables on .env:

```
NODE_ENV=development
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_PORT=3306
TYPEORM_USERNAME=<username>
TYPEORM_PASSWORD=<password>
TYPEORM_DATABASE=<dbschema>
TYPEORM_ENTITIES=src/domain/entity/*.js
TYPEORM_MAX_QUERY_EXECUTION_TIME=10000
TYPEORM_LOGGING=true
```

Install and run:

```
$ npm install

$ npm start
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

You can run the unit tests suits with

```
$ npm test
```

And check the code coverage with

```
$ npm run test:coverage
```

### Coding style tests

There are also some linting rules for code QA, for checking these, run the command:

```
$ npm run lint
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

-   Visual Studio Code

## Contributing

...

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

...

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

...
