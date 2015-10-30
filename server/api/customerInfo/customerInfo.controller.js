'use strict';

var _ = require('lodash');
var CustomerInfo = require('./customerInfo.model');

// Get list of customerInfos
exports.index = function(req, res) {
  CustomerInfo.find(function (err, customerInfos) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(customerInfos);
  });
};

// Get customerInfo for userId
exports.showByUserId = function(req, res) {

  console.log('Retrieving customerInfo for ' + req.params.userId);
  
  CustomerInfo.findInfoUser(req.params.userId, function(err,customerDetails){
    if(err) { return handleError(res, err); }
      return res.status(200).json(customerDetails);
  });
};

// Get a single customerInfo
exports.show = function(req, res) {
  CustomerInfo.findById(req.params.id, function (err, customerInfo) {
    if(err) { return handleError(res, err); }
    if(!customerInfo) { return res.status(404).send('Not Found'); }
    return res.json(customerInfo);
  });
};

// Creates a new customerInfo in the DB.
exports.create = function(req, res) {
  CustomerInfo.create(req.body, function(err, customerInfo) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(customerInfo);
  });
};

// Updates an existing customerInfo in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CustomerInfo.findById(req.params.id, function (err, customerInfo) {
    if (err) { return handleError(res, err); }
    if(!customerInfo) { return res.status(404).send('Not Found'); }
    var updated = _.merge(customerInfo, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(customerInfo);
    });
  });
};

// Deletes a customerInfo from the DB.
exports.destroy = function(req, res) {
  CustomerInfo.findById(req.params.id, function (err, customerInfo) {
    if(err) { return handleError(res, err); }
    if(!customerInfo) { return res.status(404).send('Not Found'); }
    customerInfo.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
