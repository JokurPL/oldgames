define([
  'underscore',
  'backbone',
  'models/pages/PageModel'
], function(_, Backbone, PageModel){

  var PageCollection = Backbone.Collection.extend({
      
      model: PageModel,

      pageSlug : '',

      initialize : function(models, options) {

          this.pageSlug = options.pageSlug;

      },
      
      url : function() {
        return '/page/' + this.pageSlug;
      },
    
      parse : function(data) {
          return data;
      }

  });

  return PageCollection;

});