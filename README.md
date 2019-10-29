# Express + PostGRES

## What Is This?
Nice little MVP to use as a template for Express + PostGRES stack

## Getting Started
The usual NodeJS process:
 - `npm install`
 - rename `.env.example` to `.env` and plug in your server strings (alternatively, it also takes server name, port, etc. Yet to be setup, requires modifying `database/config/config.js`).
 - `npm run start-dev` to start developing.
 - `npm run test` (or `npm run test:coverage`) to test (requres test db setup)

## TODO
 - TypeScript
 - Deployment Packaging
 - CI/CD

## Structure

### Database
Database configuration, models, and migrations are in `database`. The files in `migration` are auto-generated. Refer to Sequelize for directions. Briefly:

| task | command |
| --- | --- |
| Creating a new model | `sequelize model:generate --name ModelName --attributes field1:string,field2:integer` |
| Create a db seed | `sequelize seed:generate --name SeedName`, then `sequelize db:seed:all` |

### Routes
Routes are defined in `routes/index.js`, though the original model was to define all routes here. You may want to modulize these, and potentially model after the actual restful path structure.

### Controllers
Controllers are defined in `controllers/index.js` and, like routes, should be modulalized.

### Server Config
Defined in `server/index.js`. No touchy.

### Tests
Jest testing inside of `tests/*.test.js`.

## Author
James Robert Perih <[james@hotdang.ca](mailto:james@hotdang.ca)>
