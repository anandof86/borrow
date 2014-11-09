/**
* Item.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    userid : { type : 'String'},
    items_title :{ type : 'String'},
    items_id : {type : 'String'},
    items_img : {type : 'String'},
    items_cat : { type : 'String' },
    item_status : {type : 'Boolean'}
  }
};

