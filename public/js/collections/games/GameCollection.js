define([
  'underscore',
  'backbone',
  'models/games/GameModel'
], function(_, Backbone, GameModel){

  var GameCollection = Backbone.Collection.extend({
      
      model: GameModel,

      gameId : 0,

      initialize : function(models, options) {

          this.gameId = options.gameId;

      },
      
      url : function() {
        return '/api.php?w=game&id=' + this.gameId;
      },
    
      parse : function(data) {
          return data;
      }

  });

  return GameCollection;

});