'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerInfoSchema = new Schema({
  name: String,
  account1Number: String,
  account1Balance: String,
  account2Number: String,
  account2Balance: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('CustomerInfo', CustomerInfoSchema);