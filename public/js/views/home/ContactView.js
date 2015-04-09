define([
    'jquery',
    'underscore',
    'backbone',
    'mustache',
    'bootstrap',
    'validate',
    'dykmeta',
    'text!templates/home/contact.mustache'
], function($, _, Backbone, Mustache, Bootstrap, validate, dykMeta, contactTemplate){

    var ContactView = Backbone.View.extend({
        el: $("#content"),

        initialize:function(options) {

            this.handleEmail();

            if( APP_HTTP_STARTED ) {
                APP_HTTP_STARTED = false;
                return;
            }

            this.render();
        },

        render: function() {


            var compiledTemplate = Mustache.render(contactTemplate, {token: _txn});

            this.$el.html(compiledTemplate);


        },


        handleEmail: function () {

            var that = this;

            var isError = true;

            this.$el.find('form').validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    text: {
                        minlength: 2,
                        required: true
                    }
                },
                highlight: function (element) {
                    $(element).closest('.form-group').removeClass('success').addClass('has-error');
                },
                success: function (element) {
                    $(element).text('OK!').addClass('valid')
                        .closest('.form-group').removeClass('has-error').addClass('has-success');

                    isError = false;
                }
            });

            this.$el.find('form').submit(function(){

                if(isError) {
                    return false;
                }

                isError = true;

                $('#loadModal').modal();
                $('#loadModal').find('p.msg').empty();
                $('#fountainG').show();

                var form = $(this)

                $.post( '/home/contact', form.serialize(), function( resp ){
                    $('#loadModal').find('p.msg').empty().html('Gotowe');
                    $('#fountainG').hide();

                    form.find("input[type=email], textarea").val("");

                    window.setTimeout(function(){
                        $('#loadModal').modal('hide');
                    }, 2000);
                }, 'json' ).fail(function() {
                    $('#loadModal').find('p.msg').empty().html('Wystąpił błąd');
                    $('#fountainG').hide();

                    window.setTimeout(function(){
                        $('#loadModal').modal('hide');
                    }, 2000);
                });

                return false;
            });

        }




    });

    return ContactView;

});
