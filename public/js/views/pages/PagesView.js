define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'dykmeta',
    'collections/pages/PageCollection',
    'text!templates/pages/index.mustache'
], function($, _, Backbone, Mustache, dykMeta, PageCollection, pageTemplate){


    var PagesView = Backbone.View.extend({

        el: $("#content"),
        pageName : 'default',

        initialize:function(options) {

            if( APP_HTTP_STARTED ) {
                APP_HTTP_STARTED = false;
                return;
            }

            var that = this;

            var onDataHandler = function(collection) {
                that.render();
            };

            this.pageSlug = options.pageSlug;

            that.collection = new PageCollection([],options);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });
        },

        render: function(){

            var page = this.collection.first().toJSON();



            dykMeta.setMeta({
                title : page.name,
                keywords : page.name,
                description : page.name
            });


            var compiledTemplate = Mustache.render(pageTemplate, page );
            this.$el.html(compiledTemplate);


            return this;
        }


    });
    return PagesView;
});
