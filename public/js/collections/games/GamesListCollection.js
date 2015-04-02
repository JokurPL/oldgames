define([
  'underscore',
  'backbone',
  'models/games/GamesListModel'
], function(_, Backbone, GamesListModel){

  var GamesListCollection = Backbone.Collection.extend({
      
      model: GamesListModel,

      page : 1,
      count : 0,
      categorySlug : '',
      categoryName : '',

      initialize : function(models, options) {

          this.categorySlug = options.categorySlug;

          this.page = options.page || 1;

      },
      
      url : function() {
        return APP_URL + '/categories/' + this.categorySlug + '/' + this.page;
      },
    
      parse : function(data) {
          this.count = data.count;
          this.categoryName = data.categoryName;
          return data.games;
      }

  });

  return GamesListCollection;

});