'use strict';

var express = require('express');
var controller = require('./paymentDetails.controller');

var auth = require('../../auth/auth.service');
var sync = require('../../sync/sync.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/user/:userId', controller.payments);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), sync.sendPayment, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
