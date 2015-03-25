define([
    'jquery',
    'underscore',
    'backbone',
    'collections/news/NewsListCollection',
    'text!templates/home/homeTemplate.html'
], function($, _, Backbone, NewsListCollection, homeTemplate){

    var HomeView = Backbone.View.extend({
        el: $("#content"),

        initialize:function(options) {

            var that = this;
            var onDataHandler = function(collection) {
                that.render();
            };

            this.page = parseInt( options.page ) || 1;

            that.collection = new NewsListCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function(){


            var data = {
                news : this.collection.models
            };

            var compiledTemplate = _.template( homeTemplate,{variable: 'data'} )(data);
            this.$el.html( compiledTemplate );


        }

    });

    return HomeView;

});
