# GithubUserSpa

## Setup
To install
```
git clone https://github.com/StormBurpee/upwork-jakub
cd upwork-jakup
npm install
```

To start the program run
```
npm start
```
This uses the concurrent technology to run two npm scripts in parallel.
This means it can start the serve (port 8080), and then run the client with `ng serve` on port 4200.

then navigate to http://localhost:4200 in your local browser.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

## Technologies
Runs using typescript, scss and html as the three main languages.
Further to this, you can view additional packages in the package.json file.
The main parts are run through
**Client**
- Chart.js (For providing charts on the user profile)
- @angular/* (All of angular, the front end framework)
- @angular/flex-layout (allows us to create responsive designs easier)
- ng2-charts (Angular framework for chart.js)
- rxjs (the routing used by angular)

**Server**
the server includes the REST api, and github login authentication
- express (the actual server itself found at ./server/server.js)
- body-parser (allows us to return results in json to be read by angular)
- cookie-parser (allows us to set cookies if we desire)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
