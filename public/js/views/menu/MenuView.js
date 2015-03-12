/**
 * Created by dyktek on 12/03/15.
 */
define([
    'jquery',
    'underscore',
    'backbone',
    'dykmenu',
    'text!templates/menu/menuTemplate.html'
], function($, _, Backbone, dykMenu, menuTemplate){

    var MenuView = Backbone.View.extend({

        position : 0,

        el: $("#menu"),

        initialize: function() {

        },

        render: function(){

            var compiledTemplate = _.template( menuTemplate );
            this.$el.html(compiledTemplate);

            dykMenu.menuAction( this.$el, this.position );
        },

        setPosition : function( position ) {

            this.position = position;
        }



    });

    return MenuView;

});
