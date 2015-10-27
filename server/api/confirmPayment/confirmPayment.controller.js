'use strict';

var _ = require('lodash');
var ConfirmPayment = require('./confirmPayment.model');
var Authorize = require('./authorize');
// send the generated code via sms
var telerivet = require("../paymentDetails/telerivet")

// Get list of confirmPayments
exports.index = function(req, res) {
  ConfirmPayment.find(function (err, confirmPayments) {
    if(err) { return handleError(res, err); }
    confirmPayment();
    return res.status(200).json(confirmPayments);
  });
};

// Get a single confirmPayment
exports.show = function(req, res) {
  ConfirmPayment.findById(req.params.id, function (err, confirmPayment) {
    if(err) { return handleError(res, err); }
    if(!confirmPayment) { return res.status(404).send('Not Found'); }
    return res.json(confirmPayment);
  });
};

// Creates a new confirmPayment in the DB.
exports.create = function(req, res) {
  ConfirmPayment.create(req.body, function(err, confirmPayment) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(confirmPayment);
  });
};

// Updates an existing confirmPayment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ConfirmPayment.findById(req.params.id, function (err, confirmPayment) {
    if (err) { return handleError(res, err); }
    if(!confirmPayment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(confirmPayment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(confirmPayment);
    });
  });
};

// Deletes a confirmPayment from the DB.
exports.destroy = function(req, res) {
  ConfirmPayment.findById(req.params.id, function (err, confirmPayment) {
    if(err) { return handleError(res, err); }
    if(!confirmPayment) { return res.status(404).send('Not Found'); }
    confirmPayment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function confirmPayment(){
  
  var sessionID = Authorize.returnSessionCode();
  var tokenAuth = Authorize.tokenAuthorization();
  var number = '40745119214';
  var content = 'Token response code for transaction ID ' + sessionID
                + ' is ' + tokenAuth + '. Thank you for using our services!';
  
  // default generated session id
  console.log("Session ID is ", sessionID);
  // simulated token response
  console.log("Token Response ", tokenAuth);
  // store the code in the DB for validation when withdrawing the money from the ATM
  ConfirmPayment.updateTokenResponse(sessionID,tokenAuth);
  // Send an SMS with the token response to the user(optional)
  //telerivet.sendSMS(number,content);
}

function handleError(res, err) {
  return res.status(500).send(err);
}