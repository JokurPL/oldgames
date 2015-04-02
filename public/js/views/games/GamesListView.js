define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'dykmeta',
    'collections/games/GamesListCollection',
    'text!templates/games/list.mustache'
], function($, _, Backbone, Mustache, dykMeta, GamesListCollection, gamesListTemplate){


    var GamesListView = Backbone.View.extend({

        el: $("#content"),
        page : 1,
        pack : 0,
        categorySlug : '',

        initialize:function(options) {

            if( APP_HTTP_STARTED ) {
                APP_HTTP_STARTED = false;
                return;
            }

            var that = this;
            var onDataHandler = function(collection) {
                that.render();
            };


            this.page = parseInt( options.page ) || 1;
            this.categorySlug = options.categorySlug;

            that.collection = new GamesListCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function(){


            this.pack = Math.ceil( this.collection.count / 30 );


            dykMeta.setMeta({
                title : this.collection.categoryName,
                description : 'Kategoria starych gier ' + this.collection.categoryName,
                keywords : this.collection.categoryName
            });


            var compiledTemplate = Mustache.render(gamesListTemplate, { games: this.collection.toJSON() });

            this.$el.html( compiledTemplate );

            this.navigation();


            return this;

        },

        navigation : function() {

            var naviCont = $('#naviCont');

            naviCont.css({
                display: 'block'
            });

            var navLeft = naviCont.find('.prevPage');
            var navRight = naviCont.find('.nextPage');
            var infoPage = naviCont.find('.infoPage');

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
                href : '/categories/' + this.categorySlug + '/' + forLeft
            });

            navRight.attr({
                href : '/categories/' + this.categorySlug + '/' + toRight
            });

            infoPage.html( this.page + ' / ' + this.pack);
        }

    });
    return GamesListView;
});
