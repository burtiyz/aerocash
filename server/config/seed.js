/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var PaymentDetails = require('../api/paymentDetails/paymentDetails.model');
var CustomerInfo = require('../api/customerInfo/customerInfo.model');
var ConfirmPayment = require('../api/confirmPayment/confirmPayment.model');

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



PaymentDetails.find({}).remove(function() {
  PaymentDetails.create({
    paymentName: "MyPayment1",
    fromAccount: "123456789",
    phoneNumber: "0745111222",
    startDate:  Date.now(),
    expDate: Date.now()
  }, {
    paymentName: "MyPayment2",
    fromAccount: "987654321",
    phoneNumber: "0763222111",
    startDate:  Date.now(),
    expDate: Date.now()
  }, function(err) {
     if (err) { console.log(err); }
      console.log('Finished populating MyPayments');
    }
  );
});

CustomerInfo.find({}).remove(function() {
  CustomerInfo.create({
    name: "Marius",
    account1Number: "0000985519553",
    account1Balance: "2355.21",
    account2Number:  "0000985517756",
    account2Balance: "1200.50"
  }, {
    name: "Maxim",
    account1Number: "00009855171234",
    account1Balance: "3222.49",
    account2Number:  "0000985652987",
    account2Balance: "700.70"
  }, function(err) {
     if (err) { console.log(err); }
      console.log('Finished populating Customer Information');
    }
  );
});

ConfirmPayment.find({}).remove(function() {
  ConfirmPayment.create({
    // data generation is handled in the model definition
    }, function(err) {
     if (err) { console.log(err); }
      console.log('Finished populating Payment Confirmation Information');
    }
  );
});