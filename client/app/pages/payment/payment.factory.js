/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.payment');

  app.factory('Payment', ['$resource', 'restBasePath', function ($resource, restBasePath) {

    var paymentResource = $resource(restBasePath + 'paymentDetails/:path/:id');

    var PaymentModel = function (json) {
      this.paymentName = json.paymentName;
      this.fromAccount = json.fromAccount;
      this.amount = json.amount;
      this.phoneNumber = json.phoneNumber;
      this.startDate = json.startDate;
      this.expDate = json.expDate;
      this.authorizationCode = json.authorizationCode;
      this.processed = json.processed;
      this.user = json.user;
      this.id = json._id;

      this._amount = json.amount;
      this._paymentName = json.paymentName;
      this._fromAccount = json.fromAccount;
      this._phoneNumber = json.phoneNumber;
      this._startDate = json.startDate;
      this._expDate = json.expDate;
    };

    PaymentModel.prototype.hasChanges = function () {
      return this.paymentName != this._paymentName
        || this.fromAccount != this._fromAccount
        || this.amount != this._amount
        || this.phoneNumber != this._phoneNumber
        || this.startDate != this._startDate
        || this.expDate != this._expDate;
    };

    PaymentModel.prototype.restModel = function () {
      return {
        paymentName: this.paymentName,
        fromAccount: this.fromAccount.number,
        amount: this.amount,
        phoneNumber: this.phoneNumber,
        startDate: this.startDate,
        expDate: this.expDate,
        user: this.user
      }
    };

    PaymentModel.prototype.save = function (callback) {
      return paymentResource.save({}, this.restModel(), callback)
    };

    PaymentModel.prototype.isValid = function () {
      if (this.fromAccount && this.amount) {
        return this.fromAccount.balance >= this.amount;
      }
      return true;
    };

    return {
      create: function (user) {
        return new PaymentModel({user: user});
      },
      load: function (json) {
        return new PaymentModel(json);
      },
      history: function (userId, calback) {
        return paymentResource.query({path: 'user', id: userId}, calback);
      }
    }
  }]);
})();
