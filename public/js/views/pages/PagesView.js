define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/pages/pageTemplate.html'
], function($, _, Backbone, pageTemplate){


    var PagesView = Backbone.View.extend({

        el: $("#content"),

        initialize:function() {



            this.render();
        },

        render: function(){
            var compiledTemplate = _.template( pageTemplate );
            this.$el.html(compiledTemplate);


            return this;
        }


    });
    return PagesView;
});
