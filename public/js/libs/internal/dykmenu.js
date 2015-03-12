/**
* Created by dyktek on 12/03/15.
*/

var DYKMenu = {};

DYKMenu.menuAction = function( ob, startFrom ) {

    var character = $('div.mario');
    var startFrom = startFrom || 0;
    var menuItems = $(ob).find('.item');
    menuItems.css({
        top: '88px'
    });
    var fmenu = $(menuItems[startFrom]);
    var refToMenuElements = [];

    menuItems.each(function (key, item) {
        refToMenuElements.push($(item).attr('key', key));
    });

    var degreeFrom = parseInt(refToMenuElements[startFrom].css('top'));
    var degreeTo = parseInt(refToMenuElements[startFrom].css('top')) + refToMenuElements[0].height();


    refToMenuElements[startFrom].css({
        top: degreeTo + 'px'
    });

    character.css({display: 'block', opacity: 0}).animate({
        opacity: 1,
        left: parseInt(refToMenuElements[startFrom].css('left')) + 'px',
        top: degreeTo - parseInt(character.height()) + 'px'
    });


    var pressedDegree = startFrom;

    var running = false;

    var animDev = function (option, degree) {

        if (running) {
            return;
        }

        running = true;

        var option = option || {};

        var degree = degree || false;

        option.from = [parseInt(character.css('left')), parseInt(character.css('top'))];

        if (!option.hasOwnProperty('to') || !degree) {
            return;
        }

        if (option.to.length == 1) {
            option.to[1] = parseInt(character.css('top'));
        }


        var keyOfDegree = degree.attr('key');

        if (keyOfDegree == pressedDegree) {
            running = false;
            return;
        }

        animateDegreeUp(keyOfDegree);


        var interval;
        var allSteps = 30;
        var step = 0;
        var duration = 200;
        var timeForOneStep = duration / allSteps;

        var leftPerStep = option.to[0] - option.from[0];

        //console.log( 'from: ' + option.from[0] );
        //console.log( 'to: ' + option.to[0] );


        leftPerStep = leftPerStep / allSteps;
        //console.log('leftPerStep: ' + leftPerStep);

        var hsteps = allSteps / 2;

        var topPerStep = Math.ceil(option.curve / hsteps);
        //console.log( 'topPerStep: ' + topPerStep  );


        var back = false;
        var startAnimate = function () {

            if (step == hsteps) {
                topPerStep = topPerStep * -1;
            }


            character.css({
                left: parseInt(character.css('left')) + leftPerStep,
                top: parseInt(character.css('top')) - topPerStep
            });

            //console.log( 'left: ' + character.css('left') );
            //console.log( 'step: ' + step );

            step++;

            if (step == 20) {
                animateDegreeDown(keyOfDegree);
            }

            if (step == allSteps) {
                stopAnimation(interval);
            }


        }

        var stopAnimation = function (interval) {
            running = false;
            window.clearInterval(interval);
        }

        if (interval) {
            stopAnimation(interval);
        }

        interval = window.setInterval(startAnimate, timeForOneStep);

    };

    var animateDegreeUp = function (keyOfDegree) {

        if (keyOfDegree < pressedDegree) {
            character.addClass('flip');
        } else {
            character.removeClass('flip');
        }

        refToMenuElements[pressedDegree].animate({
            top: degreeFrom + 'px'
        }, 'fast', function () {
            pressedDegree = keyOfDegree;
        });
    };

    var animateDegreeDown = function (keyOfDegree) {
        refToMenuElements[keyOfDegree].animate({
            top: degreeTo + 'px'
        }, {
            duration: 100,
            complete: function () {
                if (this.hasAttribute('action')) {
                    //DYK.Actions[this.getAttribute('action')].apply(this);
                }
            }
        });
    }



    menuItems.click(function () {
        animDev({
            to: [parseInt($(this).css('left'))],
            curve: 130
        }, $(this));

    });
};


define(function() {
    return DYKMenu;
});