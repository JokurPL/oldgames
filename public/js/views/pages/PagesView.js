define([
    'jquery',
    'underscore',
    'backbone',
    'dykmeta',
    'text!templates/pages/pageTemplate.html'
], function($, _, Backbone, dykMeta, pageTemplate){


    var PagesView = Backbone.View.extend({

        el: $("#content"),
        pageName : 'default',

        initialize:function(options) {

            this.pageName = options.pageName;


            this.render();
        },

        render: function(){

            var data = {
                pageName : this.pageName
            };

            dykMeta.setMeta({
                title : this.pageName
            });

            var tplUrl = '/templates/pages/' + this.pageName + 'Template.html';


            var tplData = pageTemplate;

            $.ajax({
                url: tplUrl,
                method: 'GET',
                async: false,
                success: function(data) {
                    tplData = data;
                }
            });

            var compiledTemplate = _.template( tplData, {variable: 'data'} )(data);
            this.$el.html(compiledTemplate);


            return this;
        }


    });
    return PagesView;
});
