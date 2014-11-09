/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userid : {type : 'String'},
    activation_code : {type : 'String'},
    accesscode : {type : 'String'},
    status : { type: 'Boolean'},
  }
};

