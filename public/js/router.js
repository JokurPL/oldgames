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
            'categories/:categorySlug' : 'gameByCategory',
            'categories/:categorySlug/:page' : 'gameByCategory',
            'game/:name' : 'getGame',
            'p/:name': 'showPage',
            'contact': 'showContact',
            'home/:page': 'showNews',
            '*actions': 'defaultAction'
        }
    });

    var initialize = function(){

        var app_router = new AppRouter;

        app_router.on('route:showCategories', function(){
            var categoriesView = new CategoriesView();

        });

        app_router.on('route:gameByCategory', function(categorySlug, page){
            var gamesListView = new GamesListView({
                'categorySlug' : categorySlug,
                'page' : page
            });
        });

        app_router.on('route:getGame', function(name){
            var gameView = new GameView({
                'gameSlug' : name
            });
        });

        app_router.on('route:showPage', function (name) {
            var pageView = new PagesView({
                pageName : name
            });
        });

        app_router.on('route:showContact', function(){

            //var projectsView = new ProjectsView();
            //projectsView.render();

        });

        app_router.on('route:showNews', function (page) {
            var homeView = new HomeView({
                page : page
            });
        });

        app_router.on('route:defaultAction', function () {
            var homeView = new HomeView();
        });

        Backbone.history.start({ pushState: true });
        $(document.body).on('click', 'a', function(e){
            e.preventDefault();
            Backbone.history.navigate(e.currentTarget.pathname, {trigger: true});
        });

        var position = {
            'showCategories' : 1,
            'gameByCategory' : 1,
            'showPage' : 2
        };

        var posMenu = 0;
        if(
            /categories\/.*/.test( Backbone.history.fragment ) ||
            /game\/.*/.test( Backbone.history.fragment )
        ) {
            posMenu = position.gameByCategory;

        } else if(
            /p\/.*/.test( Backbone.history.fragment )
        ) {
            posMenu = position.showPage;
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
