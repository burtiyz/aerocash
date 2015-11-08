/**
 * Created by marius on 08/11/15.
 */

var AccountInfo = require('../ingAccount.model');
var CustomerInfo = require('../ingCustomer.model');

var customerInfos = [];

var createCustomerInfo = function () {
  var customerInfo = new CustomerInfo("Marius", []);
  customerInfo.accountInfo.push(new AccountInfo("0000985519553", 2355.21, "RON"));
  customerInfo.accountInfo.push(new AccountInfo("0000985517756", 1200.50, "EUR"));
  customerInfos['abcd1234'] = customerInfo;

  customerInfo = new CustomerInfo("Maxim", []);
  customerInfo.accountInfo.push(new AccountInfo("00009855171234", 3222.49, "RON"));
  customerInfo.accountInfo.push(new AccountInfo("0000985652987", 700.70, "EUR"));
  customerInfos['qwer5678'] = customerInfo;
};

createCustomerInfo();

// get customer info from ING
module.exports.getCustomerInfo = function (ingToken) {
  return customerInfos[ingToken];
};
