'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//
//  Payment details schema
//  paymentName: optional parameter to name the payment for saving
//  fromAccount: drop down list with the customer's accounts; we can leave it as string for now, as I know
//               some banks support non-numeric characters in their IBANs; this might be the case.
//  phoneNumber: numeric; we can add validation for RO format.
//  startDate: date when the funds will become available
//  expDate: date when the PassCode will expire.
//
var paymentDetailsSchema = new Schema({
  paymentName: String,
  fromAccount: String,
  phoneNumber: Number,
  startDate: Date,
  expDate: Date,
  createdAt: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

paymentDetailsSchema.statics.findPaymentsForUser = function(userId, callback){
  this.find({ user: userId }, function(err, payments){
    return callback(err, payments);
  });
};

var PaymentDetails = mongoose.model('PaymentDetails', paymentDetailsSchema);

module.exports = PaymentDetails;

