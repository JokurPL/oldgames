define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var CategorieModel = Backbone.Model.extend({

  	defaults : {
  		id : 1,
  		name : 'Game'
  	}

  });

  return CategorieModel;

});
