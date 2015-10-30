'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CustomerInfoSchema = new Schema({
  name: String,
  // the reference must be one to one
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  accountInfo: [ {number: String, balance: Number, currency: String} ]
});

CustomerInfoSchema.statics.findInfoUser = function(userId, callback){
  this.find({ user: userId }, function(err, info){
    return callback(err, info);
  });
};

module.exports = mongoose.model('CustomerInfo', CustomerInfoSchema);
