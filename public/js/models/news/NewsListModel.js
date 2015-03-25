define([
    'underscore',
    'backbone',
], function(_, Backbone) {

    var NewsListModel = Backbone.Model.extend({

        defaults : {
            count : 0,
            news : []
        }

    });

    return NewsListModel;

});
