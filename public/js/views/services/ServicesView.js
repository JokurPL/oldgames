define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/services/servicesTemplate.html'
], function($, _, Backbone, servicesTemplate){


  var ServicesView = Backbone.View.extend({
    
    el: $("#content"),

    initialize:function() {



        this.render();
    },

    render: function(){
        var compiledTemplate = _.template( servicesTemplate );
        this.$el.html(compiledTemplate);

        //dykMenu.menuAction( this.$el, 1 );
        return this;

    }



    //clearListView: function() {
    //  console.log("clearing sub view");
    //  contributorsListView.clearListView();
    //}



  });
  return ServicesView;
});
