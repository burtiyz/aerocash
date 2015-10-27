'use strict';

var _ = require('lodash');
var PaymentDetails = require('./paymentDetails.model');
var telerivet = require("./telerivet");

// Get list of paymentDetailss
exports.index = function(req, res) {
  PaymentDetails.find(function (err, paymentDetailss) {
    if(err) { return handleError(res, err); }
    //sendSMS(req,res);
    return res.status(200).json(paymentDetailss);
  });
};

// Get a single paymentDetails
exports.show = function(req, res) {
  PaymentDetails.findById(req.params.id, function (err, paymentDetails) {
    if(err) { return handleError(res, err); }
    if(!paymentDetails) { return res.status(404).send('Not Found'); }
    return res.json(paymentDetails);
  });
};

// Creates a new paymentDetails in the DB.
exports.create = function(req, res) {
  PaymentDetails.create(req.body, function(err, paymentDetails) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(paymentDetails);
  });
};

// Updates an existing paymentDetails in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PaymentDetails.findById(req.params.id, function (err, paymentDetails) {
    if (err) { return handleError(res, err); }
    if(!paymentDetails) { return res.status(404).send('Not Found'); }
    var updated = _.merge(paymentDetails, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(paymentDetails);
    });
  });
};

// Deletes a paymentDetails from the DB.
exports.destroy = function(req, res) {
  PaymentDetails.findById(req.params.id, function (err, paymentDetails) {
    if(err) { return handleError(res, err); }
    if(!paymentDetails) { return res.status(404).send('Not Found'); }
    paymentDetails.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// helper function to send the SMS;
// currently called from the index function, for testing purposes;
// call will be adjusted when the proper api calls are developed
function sendSMS(req, res){

    // my number  var number = '421919325773';

    //  Maxim    
    // var number = '421944556944';
    // Manu var number = '40740156733';
    // Calin var number = '40762234111';
    var number = '40745119214';
    //var number = '40726787999';
    var content = 'ING AeroCash Online Service PassCode: 45228764. Thank you for using our services!';
    telerivet.sendSMS(number,content);
}

function handleError(res, err) {
  return res.status(500).send(err);
}
