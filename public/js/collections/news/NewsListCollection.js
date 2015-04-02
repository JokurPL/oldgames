define([
  'underscore',
  'backbone',
  'models/news/NewsListModel'
], function(_, Backbone, NewsListModel){

  var NewsListCollection = Backbone.Collection.extend({
      
      model: NewsListModel,

      page : 1,
      count : 0,

      initialize : function(models, options) {

          this.page = options.page || 1;

      },
      
      url : function() {
        return APP_URL + '/home/' + this.page;
      },
    
      parse : function(data) {
          this.count = data.count;
          return data.news;
      }

  });

  return NewsListCollection;

});