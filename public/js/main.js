var APP_HTTP_STARTED = true;

require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        mustache: 'libs/mustache/mustache.min',
        templates: '../templates',
        dykmenu: 'libs/internal/dykmenu',
        dykmeta: 'libs/internal/dykmeta',
        bootstrap: 'libs/bootstrap/bootstrap.min',
        validate: 'libs/jquery/jquery.validate.min'
    }

});

require([
    'app',
], function(App){
    App.initialize();
});
