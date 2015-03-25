define([
    'jquery',
    'underscore',
    'backbone',
    'collections/games/GameCollection',
    'text!templates/games/gameTemplate.html'
], function($, _, Backbone, GameCollection, gameTemplate){


    var GameView = Backbone.View.extend({

        el: $("#content"),
        gameId : 0,
        gameName : '',

        initialize:function(options) {

            var that = this;

            var onDataHandler = function(collection) {
                that.render();
            };

            this.gameId = options.gameId;
            this.gameName = options.gameName;

            that.collection = new GameCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function() {


            var data = {
                game : _(this.collection.models).first()
            };


            var compiledTemplate = _.template( gameTemplate,{variable: 'data'} )(data);
            this.$el.html( compiledTemplate );

            return this;

        }


    });
    return GameView;
});
