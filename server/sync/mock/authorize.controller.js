//
// module to handle session id generation and simulate token authorization
//

// define session ID interval
var LOW = 100000;
var HIGH = 999999;
var sessionCode = Math.floor( Math.random() * (HIGH - LOW) + LOW );

module.exports = {

    generateAuthorizationToken: function(){
        // generate random 8 digit auth code
        return Math.floor( Math.random() * (HIGH * 100 - LOW * 100) + LOW * 100 );
    },

    generateSessionCode: function(LOW, HIGH){
        return Math.floor( Math.random() * (HIGH - LOW) + LOW );
    },

    returnSessionCode: function(){
        return sessionCode;
    }

};
