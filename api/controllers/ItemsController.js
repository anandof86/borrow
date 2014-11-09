/**
 * ItemsController 
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid');
var chance = require('chance').Chance();
var underscore = require('underscore');

module.exports = {
  
    getTitle : function(req,res){
        var title = req.body.title;
        sails.log.info('Searching Title :', title);
    },
  
    createItem : function(req,res){
        var userid = req.body.mobile;
        User.find({userid : userid}, function(err,result){
            if (err) {
                res.send({'code': 400, 'error': 'Some Issue'}, 400)
            }else if (result.length != 0) {
                Item.create({
                   'userid' : userid,
                   'items_title' : req.body.title,
                   'items_cat' : 'Movies',
                   'items_status' : 1,
                   'items_id' : req.body.item_id,
                   'items_img' : req.body.img
                }, function(err,items){
                    if (err) {
                        res.send({'code': 400, 'error': 'Some Issue'}, 400)
                    }else {
                        res.send({'code': 200, 'message': 'Success', 'data' : items}, 200)      
                    }
                });
            }else{
                sails.log.error("Critical Issue User Not Found! Security Alarm");
            }
        });
    },
    
    listItem : function(req,res){
        var userid = req.body.mobile;
        Item.find({userid : userid},function(err,result){
            if (err) {
                res.send({'code': 400, 'error': 'Some Issue'}, 400)
            }else{
                if (result != 0) {
                    sails.log.info('User Has Movies :', result.length);
                    res.send({'code': 200, 'message': 'Success', 'data' : result}, 200) 
                }else{
                    res.send({'code': 300, 'message': 'No Data'}, 300) 
                }
            }
        });
    }
  
};