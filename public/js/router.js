define([
    'jquery',
    'underscore',
    'backbone',
    'views/menu/MenuView',
    'views/home/HomeView',
    'views/pages/PagesView',
    'views/categories/CategoriesView',
    'views/games/GameView',
    'views/games/GamesListView',
    'views/footer/FooterView'
], function($, _, Backbone, MenuView,  HomeView, PagesView, CategoriesView, GameView, GamesListView, FooterView) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            'categories': 'showCategories',
            'c/:id/:category' : 'gameByCategory',
            'c/:id/:category/:page' : 'gameByCategory',
            'g/:id/:name' : 'getGame',
            'p/:name': 'showPage',
            'contact': 'showContact',

            // Default
            '*actions': 'defaultAction',
            '*actions/:page': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('all', function(){
            $('#navLeft').css({display:'none'});
            $('#navRight').css({display:'none'});
        });

        app_router.on('route:showCategories', function(){
            var categoriesView = new CategoriesView();

        });

        app_router.on('route:gameByCategory', function(id, category, page){
            var gamesListView = new GamesListView({
                'categoryId' : id,
                'categoryName' : category,
                'page' : page
            });
        });

        app_router.on('route:getGame', function(id, name){
            var gameView = new GameView({
                'gameId' : id,
                'gameName' : name
            });
        });

        app_router.on('route:showPage', function (name) {
            var pageView = new PagesView(name);
        });

        app_router.on('route:showContact', function(){

            //var projectsView = new ProjectsView();
            //projectsView.render();

        });

        app_router.on('route:defaultAction', function (page) {
            var homeView = new HomeView({
                page : page
            });
        });


        Backbone.history.start();
        //$(document.body).on('click', 'a', function(e){
        //    e.preventDefault();
        //    Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
        //});

        var position = {
            'showCategories' : 1,
            'gameByCategory' : 1,
            'showService' : 2
        };

        var posMenu = 0;
        if(
            /c\/[0-9]{1,9}\/.*/.test( Backbone.history.fragment ) ||
            /g\/[0-9]{1,9}\/.*/.test( Backbone.history.fragment )
        ) {
            posMenu = position.gameByCategory;
        } else {
            posMenu = position[app_router.routes[Backbone.history.fragment]]
        }

        var menuView = new MenuView({
            position: posMenu
        });

        var footerView = new FooterView();

    };
    return {
        initialize: initialize
    };
});
