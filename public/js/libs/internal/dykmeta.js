/**
 * Created by dyktek on 25/03/15.
 */

var DYKMeta = {};

DYKMeta.setMeta = function(options) {

    var options = options || {};

    var staticStr = 'Stare gry, za darmo, mario, download, klasyka gier, abandonware, pc, pegasus, commodore, atari, staregry.dyk.pl';
    var staticKeyStr = 'stare gry, klasyka gier, stare gry na pc-ta, gry, old games, commodore, atarii, pegasus';
    var staticDescStr = 'stare gry klasyka gier w serwisie staregry.dyk.pl - najepsza klasyka gier i stare gry';


    if( !options.hasOwnProperty('title') ) {
        options.title = staticStr;
    } else {
        options.title = options.title + ' - ' + staticStr;
    }

    if( !options.hasOwnProperty('description') ) {
        options.description = staticDescStr;
    } else {
        options.description = options.description + ' - ' + staticDescStr;
    }

    if( !options.hasOwnProperty('keywords') ) {
        options.keywords = staticKeyStr;
    } else {
        options.keywords = options.keywords + ', ' + staticKeyStr;
    }

    var allHead = $(document.head);

    var title = allHead.find('title');
    var keywords = allHead.find('meta[name="keywords"]');
    var description = allHead.find('meta[name="description"]');

    title.text( options.title );

    keywords.attr( 'content', options.keywords );

    description.attr( 'content', options.description );

};

define(function() {
    return DYKMeta;
});