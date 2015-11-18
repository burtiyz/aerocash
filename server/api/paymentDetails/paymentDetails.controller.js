'use strict';

var _ = require('lodash');
var PaymentDetails = require('./paymentDetails.model');
var  User = require('../user/user.model');
var telerivet = require("./telerivet");

// Get list of paymentDetailss
exports.index = function(req, res) {
  PaymentDetails.find(function (err, paymentDetailss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(paymentDetailss);
  });
};

// Get list of paymentDetails for userId
exports.payments = function(req, res) {
  //  Search the payments database for all the entries
  //  created by a specific user;
  //  Search is conducted with the URI received from front end.
  console.log('Retrieving payments for ' + req.params.userId);

  PaymentDetails.findPaymentsForUser(req.params.userId, function(err,paymentDetails){
    if(err) { return handleError(res, err); }
      return res.status(200).json(paymentDetails);
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
    sendSMS(paymentDetails);
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
function sendSMS(paymentDetails){

    var content = 'ING AeroCash Online Service PassCode: '+ paymentDetails.authorizationCode +'. Thank you for using our services!';
    telerivet.sendSMS(paymentDetails.phoneNumber,content);
}

function handleError(res, err) {
  return res.status(500).send(err);
}
