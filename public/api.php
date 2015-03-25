<?php
/**
 * Created by PhpStorm.
 * User: dyktek
 * Date: 10/03/15
 * Time: 10:50
 */

include "../lib/pdo.php";

function plCharset($string) {

    $string = strtolower($string);
    $polskie = array('/',',', ' - ',' ','ę', 'Ę', 'ó', 'Ó', 'Ą', 'ą', 'Ś', 's', 'ł', 'Ł', 'ż', 'Ż', 'Ź', 'ź', 'ć', 'Ć', 'ń', 'Ń','-',"'","/","?", '"', ":", 'ś', '!','.', '&', '&amp;', '#', ';', '[',']','domena.pl', '(', ')', '`', '%', '”', '„', '…');
    $miedzyn = array('-','-','-','-','e', 'e', 'o', 'o', 'a', 'a', 's', 's', 'l', 'l', 'z', 'z', 'z', 'z', 'c', 'c', 'n', 'n','-',"","","","","",'s','','', '', '', '', '', '', '', '', '', '', '', '', '');
    $string = str_replace($polskie, $miedzyn, $string);

    $string = preg_replace('/[^0-9a-z\-]+/', '', $string);

    $string = preg_replace('/[\-]+/', '-', $string);

    $string = trim($string, '-');

    $string = stripslashes($string);

    $string = urlencode($string);

    return $string;
}

function escapeJsonString($value) {
    # list from www.json.org: (\b backspace, \f formfeed)
    $escapers =     array("\\",     "/",   "\"",  "\n",  "\r",  "\t", "\x08", "\x0c");
    $replacements = array("\\\\", "\\/", "\\\"", "\\n", "\\r", "\\t",  "\\f",  "\\b");
    $result = str_replace($escapers, $replacements, $value);
    return $result;
}


$what = isSet( $_GET['w'] ) ? $_GET['w']  : '';
$page = isSet( $_GET['page'] ) ? intval( $_GET['page'] ) -1  : 0;
$page = ( $page < 0 ) ? 0 : $page;
$limit = 30;
$from = $limit * $page;

if( $what == 'categoriesList' ) {
    $sth = $dbh->prepare('SELECT * FROM dyk_kat_linki ORDER BY dzial ASC');
    $sth->execute();
    $res = $sth->fetchAll();

    $temp = [];
    foreach( $res as $value ) {
        array_push( $temp, array(
            'id' => $value['id'],
            'dzial' => $value['dzial'],
            'dzial_link' => plCharset( $value['dzial'] )
        ));
    }



    echo json_encode( $temp );
} else if( $what == 'gamesList' && isSet( $_GET['id'] ) ) {

    $id = intval( $_GET['id'] );

    $sth = $dbh->prepare('SELECT COUNT(id) AS `count` FROM dyk_gry WHERE kategoria = ' . $id);
    $sth->execute();
    $count = $sth->fetch();


    $sth = $dbh->prepare('SELECT id, nazwa_gry, platforma, screen  FROM dyk_gry WHERE kategoria = ' . $id . ' ORDER BY nazwa_gry ASC LIMIT ' . $from . ',' . $limit);
    $sth->execute();
    $res = $sth->fetchAll();

    $temp = [];
    foreach( $res as $value ) {
        array_push( $temp, array(
            'id' => $value['id'],
            'nazwa_gry' => $value['nazwa_gry'],
            'nazwa_link' => plCharset( $value['nazwa_gry'] ),
            'platforma' => $value['platforma'],
            'screen' => $value['screen']
        ) );
    }

    $result = array(
        'count' => $count['count'],
        'games' => $temp
    );

    echo json_encode( $result );

} else if ( $what == 'game' && isSet( $_GET['id'] ) ) {

    $id = intval( $_GET['id'] );

    $sth = $dbh->prepare( 'SELECT dg.*, dkl.dzial FROM dyk_gry dg LEFT JOIN dyk_kat_linki dkl ON dg.kategoria = dkl.id WHERE dg.id = ' . $id . ' LIMIT 1' );
    $sth->execute();
    $res = $sth->fetch(PDO::FETCH_NAMED);

    $res['nazwa_link'] = plCharset( $res['nazwa_gry'] );
    $res['kategoria_link'] = plCharset( $res['dzial'] );
    $res['opis'] = iconv( "ISO-8859-2", "UTF-8", $res['opis'] );

    echo json_encode( $res );
} else if ( $what == 'newsList' ) {

    $limit = 3;
    $from = $limit * $page;

    $sth = $dbh->prepare('SELECT COUNT(id) AS `count` FROM dyk_newsy');
    $sth->execute();
    $count = $sth->fetch(PDO::FETCH_NAMED);


    $sth = $dbh->prepare('SELECT id, tytul, tresc, `data` FROM dyk_newsy ORDER BY id DESC LIMIT ' . $from . ',' . $limit);
    $sth->execute();
    $res = $sth->fetchAll(PDO::FETCH_NAMED);

    $temp = [];
    foreach( $res as $value ) {

        $value['tresc'] = str_replace( 'http://dyktek.civ.pl/dyk/content/', 'http://staregry.dyk.pl/',  $value['tresc'] );

        array_push( $temp, array(
            'id' => $value['id'],
            'tytul' => $value['tytul'],
            'data' => $value['data'],
            'tresc' => iconv( "ISO-8859-2", "UTF-8", $value['tresc'] )
        ) );
    }


    $result = array(
        'count' => $count['count'],
        'news' => $temp
    );

    echo json_encode( $result );
}