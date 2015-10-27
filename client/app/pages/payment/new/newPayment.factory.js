/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.payment');

  app.factory('Payment', ['$resource', 'restBasePath', function ($resource, restBasePath) {

    var paymentResource = $resource(restBasePath + 'paymentDetails');

    var PaymentModel = function (json) {
      if (json) {
        this.paymentName = json.paymentName;
        this.fromAccount = json.fromAccount;
        this.phoneNumber = json.phoneNumber;
        this.startDate = json.startDate;
        this.expDate = json.expDate;

        this._paymentName = json.paymentName;
        this._fromAccount = json.fromAccount;
        this._phoneNumber = json.phoneNumber;
        this._startDate = json.startDate;
        this._expDate = json.expDate;
      } else {
        this.paymentName = null;
        this.fromAccount = null;
        this.phoneNumber = null;
        this.startDate = null;
        this.expDate = null;

        this._paymentName = null;
        this._fromAccount = null;
        this._phoneNumber = null;
        this._startDate = null;
        this._expDate = null;
      }
    };

    PaymentModel.prototype.hasChanges = function () {
      return this.paymentName != this._paymentName
        || this.fromAccount != this._fromAccount
        || this.phoneNumber != this._phoneNumber
        || this.startDate != this._startDate
        || this.expDate != this._expDate;
    };

    PaymentModel.prototype.restModel = function () {
      return {
        paymentName: this.paymentName,
        fromAccount: this.fromAccount,
        phoneNumber: this.phoneNumber,
        startDate: this.startDate,
        expDate: this.expDate
      }
    };

    PaymentModel.prototype.save = function (callback) {
      paymentResource.save({}, this.restModel(), callback)
    };

    return {
      createModel: function (json) {
        return new PaymentModel(json);
      }
    }
  }]);
})();
