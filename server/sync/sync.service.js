/**
 * Created by marius on 08/11/15.
 */

'use strict';

var _ = require('lodash');
var compose = require('composable-middleware');

var controller = require('./mock/sync.controller');
var authorize = require('./mock/authorize.controller');
var CustomerInfo = require('../api/customerInfo/customerInfo.model');

module.exports.initCustomerInfo = function (req, res, next) {
  var customerInfo = controller.getCustomerInfo(req.body.ingToken);
  if (!customerInfo) {return handleError(res, "Token not found!");}

  customerInfo.user = req.params.id;
  CustomerInfo.create(customerInfo, function (err) {
    if (err) {handleError(res, err);}
    return next();
  });
};

module.exports.sendPayment = function (req, res, next) {
  // generate authorization code
  req.body.authorizationCode = authorize.generateAuthorizationToken();
  var updatedCustomer = controller.updateCustomerInfo(req.user.ingToken, req.body);
  if (!updatedCustomer) {return handleError(res, "Token not found!");}

  CustomerInfo.findInfoUser(req.user.id, function (err, existingCustomer) {
    if (err) { return handleError(res, err); }
    if (!existingCustomer) { return res.status(404).send('Not Found'); }
    var updated = _.extend(existingCustomer, updatedCustomer);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return next();
    });
  });
};

module.exports.processPayment = function (req, res, next) {
  if (controller.finalizePayment(req.body.payment)) {
    return next();
  } else {
    return res.status(404).send('Not Found');
  }
};

function handleError(res, err) {
  return res.status(500).send(err);
}
