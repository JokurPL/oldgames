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

        menuSmall : $('.smallMenu'),

        initialize: function( option ) {
            this.position = option.position;

            this.render();
        },

        render: function(){
            //var that = this;
            //var menuTemplateCpy = menuTemplate;

            //var tmpMenu = '';
            //var leftValue = 0;
            //var tmpMenu = '<div class="mario"></div>';

            //$(menuTemplate).filter('div').each( function( key, item ) {
            //    leftValue = 200 * key;
            //    item.setAttribute('style', 'left:' + leftValue + 'px;');
            //
            //    tmpMenu += that.outerHTML( item );
            //} );

            //this.menuSmall.html( menuTemplateCpy );
            //var compiledTemplate = _.template( tmpMenu );
            //this.$el.html(compiledTemplate);
            dykMenu.menuAction( this.$el, this.position );

        },

        outerHTML : function(node){
            return node.outerHTML || new XMLSerializer().serializeToString(node);
        }



    });

    return MenuView;

});
