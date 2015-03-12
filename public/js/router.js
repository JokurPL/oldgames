define([
  'jquery',
  'underscore',
  'backbone',
  'views/menu/MenuView',
  'views/home/HomeView',
  'views/services/ServicesView',
  'views/categories/CategoriesView',
  'views/footer/FooterView'
], function($, _, Backbone, MenuView,  HomeView, ServicesView, CategoriesView, FooterView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'categories': 'showCategories',
      'service': 'showService',
      'contact': 'showContact',
      
      // Default
      '*actions': 'defaultAction'
    }
  });
  
  var initialize = function(){

    var app_router = new AppRouter;

    var menuPosition = 0;

    app_router.on('route:showCategories', function(){
        var categoriesView = new CategoriesView();

    });

    app_router.on('route:showService', function () {
        var servicesView = new ServicesView();
    });

      app_router.on('route:showContact', function(){

          //var projectsView = new ProjectsView();
          //projectsView.render();

      });

    app_router.on('route:defaultAction', function (actions) {

        var homeView = new HomeView();
        homeView.render();
    });


      Backbone.history.start();

      var position = {
          'showCategories' : 1,
          'showService' : 2
      }

    var menuView = new MenuView();
    menuView.setPosition( position[app_router.routes[Backbone.history.fragment]] );
    menuView.render();

    var footerView = new FooterView();

  };
  return { 
    initialize: initialize
  };
});
