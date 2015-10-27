'use strict';

var Authorize = require('./authorize');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//
//  Default the session code to the initial generated random number
//
var ConfirmPaymentSchema = new Schema({
  sessionCode: { type: Number, default: Authorize.returnSessionCode() },
  authorizationCode: { type: String, default: " " },
  expDate: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
});

ConfirmPaymentSchema.statics.updateTokenResponse = function(sessionCodeID,tokenAuth){
  this.findOne({ sessionCode: sessionCodeID }, function(err, confirmation){
    if (err) { console.log(err); }
    confirmation.authorizationCode = tokenAuth;
    confirmation.save();
    console.log('Token response updated in the database');
  });
}

var ConfirmPayment = mongoose.model('ConfirmPayment', ConfirmPaymentSchema);

module.exports = ConfirmPayment;

