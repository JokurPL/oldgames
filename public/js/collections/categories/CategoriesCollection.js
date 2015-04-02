define([
  'underscore',
  'backbone',
  'models/categorie/CategorieModel'
], function(_, Backbone, CategorieModel){

  var CategoriesCollection = Backbone.Collection.extend({
      
      model: CategorieModel,

      initialize : function(models, options) {},
      
      url : function() {
        return APP_URL + '/categories';
      },
    
      parse : function(data) {
          return data;
      }

  });

  return CategoriesCollection;

});