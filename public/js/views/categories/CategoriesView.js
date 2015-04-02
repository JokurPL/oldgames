define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'dykmeta',
    'collections/categories/CategoriesCollection',
    'text!templates/categories/index.mustache'
], function($, _, Backbone, Mustache, dykMeta, CategoriesCollection, categoriesTemplate){


    var CategoriesView = Backbone.View.extend({

        el: $("#content"),

        initialize:function() {

            if( APP_HTTP_STARTED ) {
                APP_HTTP_STARTED = false;
                return;
            }

            var that = this;

            var onDataHandler = function(collection) {
                that.render();
            }

            that.collection = new CategoriesCollection([]);
            that.collection.fetch({ success : onDataHandler, dataType: "json" });

        },

        render: function(){

            var keywords = [];
            _.each(this.collection.models,function( elem ){
                keywords.push( elem.get('dzial') );
            });

            dykMeta.setMeta({
                title : 'Kategorie gier',
                keywords : 'stare gry,' + keywords.join()
            });

            var compiledTemplate = Mustache.render(categoriesTemplate, { categories: this.collection.toJSON() });

            this.$el.html( compiledTemplate );


            return this;

        }


    });
    return CategoriesView;
});
