define([
  'underscore',
  'backbone',
  'models/games/GameModel'
], function(_, Backbone, GameModel){

  var GameCollection = Backbone.Collection.extend({
      
      model: GameModel,

      gameSlug : '',

      initialize : function(models, options) {

          this.gameSlug = options.gameSlug;

      },
      
      url : function() {
        return '/game/' + this.gameSlug;
      },
    
      parse : function(data) {
          return data;
      }

  });

  return GameCollection;

});