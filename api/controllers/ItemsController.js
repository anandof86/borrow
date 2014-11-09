/**
 * ItemsController 
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid');
var chance = require('chance').Chance();
var yify = require('yify');
var underscore = require('underscore');

module.exports = {
  
  getTitle : function(req,res){
    var title = req.body.title;
    sails.log.info('Searching Title :', title);
    
  }
  
  
};