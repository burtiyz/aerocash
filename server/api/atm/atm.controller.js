/**
 * Created by marius on 14/11/15.
 */
'use strict';

var _ = require('lodash');
var PaymentDetails = require('../paymentDetails/paymentDetails.model');

module.exports.checkPhoneNumber = function (req, res, next) {
  PaymentDetails
    .findOne(
      {
        phoneNumber: req.params.phoneNumber,
        processed: false,
        expDate: {$gte: Date.now()},
        startDate: {$lte: Date.now()}
      },
      function (err, payment) {
        if (err) {return handleError(res, err);}
        if (!payment) {return res.status(200).json({result: false});}
        req.body.payment = payment;
        return next();
      });
};

module.exports.checkAuthorizationCode = function (req, res, next) {
  var payment = req.body.payment;
  if (!payment) {return res.status(200).json({result: false});}

  if (payment.authorizationCode === req.params.authorizationCode) {
    next();
  } else {
    return res.status(200).json({result: false});
  }
};

module.exports.answer = function (req, res) {
  return res.status(200).json({result: true});
};

module.exports.details = function (req, res) {
  var payment = req.body.payment;
  if (!payment) {return res.status(200).json({result: false});}

  return res.status(200).json(payment);
};

module.exports.withdraw = function (req, res) {
  var payment = req.body.payment;
  if (!payment) {return res.status(200).json({result: false});}

  payment.processed = true;
  payment.save(function (err, paymentDetails) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(paymentDetails);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
