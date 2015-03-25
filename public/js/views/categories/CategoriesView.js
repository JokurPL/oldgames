define([
  'jquery',
  'underscore',
  'backbone',
  'collections/categories/CategoriesCollection',
  'text!templates/categories/categoriesTemplate.html'
], function($, _, Backbone, CategoriesCollection, categoriesTemplate){


  var CategoriesView = Backbone.View.extend({
    
    el: $("#content"),

    initialize:function() {

      var that = this;

      var onDataHandler = function(collection) {
          that.render();
      }

      that.collection = new CategoriesCollection([]);
      that.collection.fetch({ success : onDataHandler, dataType: "json" });

    },

    render: function(){

        var data = {
            categories: this.collection.models
        };

        var compiledTemplate = _.template( categoriesTemplate,{variable: 'data'} )(data);
        this.$el.html( compiledTemplate );

        return this;

    }

    //clearListView: function() {
    //  console.log("clearing sub view");
    //  contributorsListView.clearListView();
    //}



  });
  return CategoriesView;
});
