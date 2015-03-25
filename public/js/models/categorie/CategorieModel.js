define([
    'underscore',
    'backbone',
], function(_, Backbone) {

    var CategorieModel = Backbone.Model.extend({

        defaults : {
            id : 1,
            dzial : 'Game',
            dzial_link : ''
        }

    });

    return CategorieModel;

});
