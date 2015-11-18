/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var q = require('q');

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var PaymentDetails = require('../api/paymentDetails/paymentDetails.model');
var CustomerInfo = require('../api/customerInfo/customerInfo.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }, function(err) {
     if (err) { console.log(err); }
     console.log('Finished populating things');
  });
});

var user1Def = q.defer();
var user2Def = q.defer();

User.find({}).remove(function() {
  User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function(err, user1, user2) {
      if (err) {
        user1Def.reject(err);
        user2Def.reject(err);
      } else {
        user1Def.resolve(user1);
        user2Def.resolve(user2);
        console.log('finished populating users');
      }
    }
  );
});

user1Def.promise.then(function(user){
  PaymentDetails.find({}).remove(function() {
    PaymentDetails.create({
        paymentName: "MyPayment1",
        fromAccount: "0000985519553",
        phoneNumber: "0745111222",
        amount: 50,
        startDate: Date.now(),
        expDate: Date.now(),
        user: user.id
      },
      {
        paymentName: "MyPayment2",
        fromAccount: "0000985517756",
        phoneNumber: "0763222111",
        amount: 100,
        startDate: Date.now(),
        expDate: Date.now(),
        user: user.id
      }, function (err) {
        if (err) { console.log(err); }
        console.log('Finished populating MyPayments');
      }
    );
  });
});
