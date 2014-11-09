var client = require('twilio')('ACc594f63b59a8be30bb549eb841c8548d', 'b768918c2fa8e2c2984a6be5a579f1d6');


module.exports =  {
    send_activation_code : function(tono,code){
        //Send an SMS text message
        client.sendMessage({
            to:tono, // Any number Twilio can deliver to
            from: '+13853557830', // A number you bought from Twilio and can use for outbound communication
            body: 'Your Activation is ' + code + ' Please use this code to Activate Borrow Account, Thanks in Ton :) ' // body of the SMS message
        
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
        
            if (!err) { // "err" is an error received during the request, if any
        
                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1
                sails.log.info("Activation Code Sent Successfully");
                sails.log.info(responseData.from); // outputs "+14506667788"
                sails.log.info(responseData.body); // outputs "word to your mother."
        
            }
        });
    }
}

