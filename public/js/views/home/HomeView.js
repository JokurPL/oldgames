define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'dykmeta',
    'collections/news/NewsListCollection',
    'text!templates/home/index.mustache'
], function($, _, Backbone, Mustache, dykMeta, NewsListCollection, homeTemplate){

    var HomeView = Backbone.View.extend({
        el: $("#content"),
        page : 1,
        pack : 0,

        initialize:function(options) {

            if( APP_HTTP_STARTED ) {
                APP_HTTP_STARTED = false;
                return;
            }
            dykMeta.setMeta();
            var that = this;
            var onDataHandler = function(collection) {
                that.render();
            };

            var options = options || {};

            this.page = parseInt( options.page ) || 1;


            that.collection = new NewsListCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function(){

            this.pack = Math.ceil( this.collection.count / 3 );

            if( this.page > this.pack ) {
                window.location.href = '/';
                return;
            }

            var compiledTemplate = Mustache.render(homeTemplate, { news: this.collection.toJSON() });

            this.$el.html( compiledTemplate );

            this.navigation();

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
                href : '/home/' + forLeft
            });

            navRight.attr({
                href : '/home/' + toRight
            });

            infoPage.html( this.page + ' / ' + this.pack);
        }

    });

    return HomeView;

});
