/**
 * Created by dyktek on 05/03/15.
 */
require.config({
    paths: {
        jquery: 'libs/jquery/jquery',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone'
    }

});

require([
    'app',
], function(App){
    App.initialize();
});