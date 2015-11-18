var telerivet = require('telerivet');

var API_KEY = 'z5igi0sU4rSOXJfi9KDAIBTaka1w4Xw1';  // from https://telerivet.com/api/keys
var PROJECT_ID = 'PJc56f3a616d4bdfe3'; 

var tr = new telerivet.API(API_KEY);

var project = tr.initProjectById(PROJECT_ID); 

// send message
module.exports = {
    sendSMS: function(number, content, callback){
        project.sendMessage({
        to_number: number, 
        content: content
        }, function(err, message) {
                if (err) throw err;
                console.log(message);
                console.log("SMS Sent");
                return(callback);
            });
        }
};


