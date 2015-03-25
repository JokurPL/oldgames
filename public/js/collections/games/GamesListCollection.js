define([
  'underscore',
  'backbone',
  'models/games/GamesListModel'
], function(_, Backbone, GamesListModel){

  var GamesListCollection = Backbone.Collection.extend({
      
      model: GamesListModel,

      categoryId : 0,
      page : 1,
      count : 0,

      initialize : function(models, options) {

          this.categoryId = options.categoryId;

          this.page = options.page || 1;

      },
      
      url : function() {
        return '/api.php?w=gamesList&id=' + this.categoryId + '&page=' + this.page;
      },
    
      parse : function(data) {
          this.count = data.count;
          return data.games;
      }

  });

  return GamesListCollection;

});