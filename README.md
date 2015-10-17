### Welcome to Aerocash

#### Environment setup:

* Install Yeoman: `npm install -g yo`
* Install MEAN generator: `npm install -g generator-angular-fullstack`
* Install server dependencies: `npm install`
* Install client dependencies: `bower install`
* Start mongoDb: `mongod --smallfiles`
* Start the server: `grunt serve`
* Open the app: `https://aerocash-<username>.c9.io:8080/` (where <username> is your c9 account)

#### Yeoman cheatsheet  
* Add a new API endpoint (server): `yo angular-fullstack:endpoint message` this will generate a model and a controller to interact with that model:
  * `server/api/message/message.controller.js`, 
  * `server/api/message/message.model.js`
* Add a new route (client): `yo angular-fullstack:route myroute` this will generate the new route config together a view and a controller:
  * `client/app/myroute/myroute.js`
  * `client/app/myroute/myroute.controller.js`
  * `client/app/myroute/myroute.html`
* Heroku deployment:
  * `yo angular-fullstack:heroku` to deploy the app on heroku
  * `heroku addons:create mongolab` for DB setup on heroku
