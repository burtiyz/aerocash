/**
 * Created by marius on 14/11/15.
 */
'use strict';

var express = require('express');
var controller = require('./atm.controller');

var sync = require('../../sync/sync.service');

var router = express.Router();

router.get('/check/:phoneNumber', controller.checkPhoneNumber, controller.answer);
router.get('/check/:phoneNumber/:authorizationCode', controller.checkPhoneNumber, controller.checkAuthorizationCode,
  controller.answer);
router.get('/details/:phoneNumber/:authorizationCode', controller.checkPhoneNumber, controller.checkAuthorizationCode,
  controller.details);
router.post('/withdraw/:phoneNumber/:authorizationCode', controller.checkPhoneNumber,
  controller.checkAuthorizationCode, sync.processPayment, controller.withdraw);

module.exports = router;
