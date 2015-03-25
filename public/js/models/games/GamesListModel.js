define([
    'underscore',
    'backbone',
], function(_, Backbone) {

    var GamesListModel = Backbone.Model.extend({

        defaults : {
            count : 0,
            games : []
        }

    });

    return GamesListModel;

});
