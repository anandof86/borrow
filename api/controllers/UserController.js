/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid');
var chance = require('chance').Chance();

module.exports = {
    
    
    /*----------User Registration ------------
     * with mobile number and triggring SMS to resgistred mobile no 
     * with six dight unique activation code to activate
     */
    
    register : function(req,res){
        var user_id = req.body.mobile;
        sails.log.info('User Mobile No:', user_id);
        User.find({'userid' : user_id}, function(err,result){
            if (err) {
                res.send({'code': 400, 'error': 'Some issue'}, 400)
            }else{
                if (result.length != 0) {
                    sails.log.error("User Already Exists");
                    res.send({'code': 300, 'error': 'User Already Exists'}, 300)
                }else{
                    sails.log.info("New User");
                    var act_code = chance.natural({min: 1, max: 999999});
                    sails.log.info('Activation Code :', act_code);
                    User.create({
                        userid : req.body.mobile,
                        activation_code : act_code,
                        status : 0
                        }, function(err, result) {
                        if(err) {
                            res.send({'code': 400, 'error': 'Some issue'}, 400)
                        } else {
                            res.send({'code': 200, 'message': 'Success'}, 200)
                            sms.send_activation_code(user_id,act_code);
                        }
                    });
                }
            }
        })
    },
    
    /*---------- Resend Activation Code ------------
     * Check for Valid Mobile No and Activation Status of the account is set to false 
     * Then Trigger and Activation Code SMS and Update the same in Db
     * TODO : A mobile no can recive a maximum of 3 SMS in 24Hrs, should use moment to
     * get this done.
     */
    
    resend : function(req,res){
        var user_id = req.body.mobile;
        var act_code = chance.natural({min: 1, max: 999999});
        User.find({'userid' : user_id}, function(err,result){
            if (err) {
                res.send({'code': 400, 'error': 'Some issue'}, 400)
            }else{
                if (result.length != 0) {
                    User.findOne({'userid': user_id}, function(err,result){
                        if (err) {
                            res.send({'code': 400, 'error': 'Some issue'}, 400)
                        }else{
                            if (result.status == false) {
                                result.activation_code = act_code;
                                result.save();
                                sms.send_activation_code(user_id,act_code);
                                res.send({'code': 200, 'message': 'Success'}, 200)
                            }else{
                                res.send({'code': 202, 'message': 'Account Already Activated Successfully!'}, 202)   
                            }
                        }
                    });
                }else{
                    sails.log.error("Invalid Mobile No");
                    res.send({'code': 300, 'error': 'Mobile No not Registred'}, 300)   
                }
            }
        });
    },
    
    /*---------- Activate Account ------------
     * Activate Account with SMS sent and Update Account status
     * Should Check for Valid Activation Code
     */ 
    
    activate : function(req,res){
        var user_id = req.body.mobile;
        var access_code = req.body.code;
        sails.log.info('User Mobile No:', user_id);
        User.find({'userid': user_id}, function(err,result){
            if (err) {
                res.send({'code': 400, 'error': 'Some issue'}, 400)
            }else{
                if (result != 0) {
                    if (result[0].activation_code == access_code) {
                        sails.log.info("Valid Activation Code");
                        //TODO - Change Account Status and Send Access Code to set on Request Header
                        User.findOne({'userid': user_id}, function(err,result){
                            if (err) {
                                res.send({'code': 400, 'error': 'Some issue'}, 400)
                            }else{
                                if (result.status == false) {
                                    result.status = 1;
                                    result.accesscode = uuid.v4();
                                    result.save();
                                    res.send({'code': 200, 'message': 'Account Activated Successfully!', data: result.accesscode }, 200)
                                    sails.log.info("account activated");
                                }else{
                                    res.send({'code': 202, 'message': 'Account Already Activated Successfully!'}, 202)   
                                }
                            }
                        });
                    }else{
                        sails.log.error("Invalid Activation Code");
                        res.send({'code': 201, 'error': 'Invalid Activation Code'}, 201)
                    }
                }else{
                    sails.log.error("Invalid Mobile No");
                    res.send({'code': 300, 'error': 'Mobile No not Registred'}, 300)
                }
            }
        });
    },
    
    /*--------------- Deactivate Account -----------------
     * Deactivate User Account and Delete Access Code from Client and Server DB
     * Change account status 
     */
    
    
    deactivate : function(req,res){
        // TODO : This will be accessed when user delete the account should set account status to be false
        // and remove and delete accesscode from both client and server db
        var user_id = req.body.mobile;
    },
    
    /*---------------- Update Display Name ---------------
     * Change User Display Name when ever they need 
     */
    
    updatedisplay : function(req,res){
        
    }
};

