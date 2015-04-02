// Filename: app.js
define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'dykmeta',
], function($, _, Backbone, Router, dykMeta){
    var initialize = function(){
        //dykMeta.setMeta();
        Router.initialize();
    };

    return {
        initialize: initialize
    };
});
