define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'dykmeta',
    'collections/games/GameCollection',
    'text!templates/games/index.mustache'
], function($, _, Backbone, Mustache, dykMeta, GameCollection, gameTemplate){


    var GameView = Backbone.View.extend({

        el: $("#content"),
        gameSlug : '',
        gameName : '',

        initialize:function(options) {

            if( APP_HTTP_STARTED ) {
                APP_HTTP_STARTED = false;
                return;
            }

            var that = this;

            var onDataHandler = function(collection) {
                that.render();
            };

            this.gameSlug = options.gameSlug;

            that.collection = new GameCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function() {

            var game = this.collection.first();

            dykMeta.setMeta({
                title : game.get('name') + ' - ' + game.get('cat_name'),
                description : 'Stara gra ' + game.get('name') + ' z kategorii ' + game.get('cat_name'),
                keywords : game.get('name') + ' - ' + game.get('cat_name')
            });

            var compiledTemplate = Mustache.render(gameTemplate, game.toJSON() );

            this.$el.html( compiledTemplate );

            return this;

        }


    });
    return GameView;
});
