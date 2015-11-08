/**
 * Created by marius on 08/11/15.
 */

'use strict';

var compose = require('composable-middleware');

var controller = require('./mock/sync.controller');
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

function handleError(res, err) {
  return res.status(500).send(err);
}
