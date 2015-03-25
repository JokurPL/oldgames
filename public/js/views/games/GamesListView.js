define([
    'jquery',
    'underscore',
    'backbone',
    'collections/games/GamesListCollection',
    'text!templates/games/gamesListTemplate.html'
], function($, _, Backbone, GamesListCollection, gamesListTemplate){


    var GamesListView = Backbone.View.extend({

        el: $("#content"),
        page : 1,
        pack : 0,
        categoryId : 0,
        categoryName : '',

        initialize:function(options) {

            var that = this;
            var onDataHandler = function(collection) {
                that.render();
            };

            this.page = parseInt( options.page ) || 1;
            this.categoryId = options.categoryId;
            this.categoryName = options.categoryName;

            that.collection = new GamesListCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function(){


            this.pack = Math.ceil( this.collection.count / 30 );

            this.navigation();

            var data = {
                games : this.collection.models
            };

            var compiledTemplate = _.template( gamesListTemplate,{variable: 'data'} )(data);
            this.$el.html( compiledTemplate );

            return this;

        },

        navigation : function() {

            var navLeft = $('#navLeft');
            var navRight = $('#navRight');

            var forLeft = this.page;
            var toRight = this.page + 1;

            if( this.page <= 1 ) {
                navLeft.css({display : 'none'});
            } else {
                navLeft.css({display : 'block'});
                forLeft--;
            }

            if( this.page < this.pack ) {
                navRight.css({display : 'block'});
            } else {
                navRight.css({display : 'none'});
            }


            navLeft.attr({
                href : '/#/c/' + this.categoryId + '/' + this.categoryName + '/' + forLeft
            });

            //console.log( naviLeft.attr

            navRight.attr({
                href : '/#/c/' + this.categoryId + '/' + this.categoryName + '/' + toRight
            });
        }


    });
    return GamesListView;
});
