<?php
/**
 * Created by PhpStorm.
 * User: dyktek
 * Date: 10/03/15
 * Time: 10:50
 */


$what = isSet( $_GET['w'] ) ? $_GET['w']  : '';


if( $what == 'categoriesList' ) {

    echo json_encode(array(
        array(
            'id' => 1,
            'name' => 'Bijatyki'
        ),
        array(
            'id' => 2,
            'name' => 'Biznes/ekonomia'
        ),
        array(
            'id' => 3,
            'name' => 'cRPG'
        ),
        array(
            'id' => 4,
            'name' => 'Fpp'
        ),
        array(
            'id' => 5,
            'name' => 'Logiczne'
        ),
        array(
            'id' => 6,
            'name' => 'Mmo'
        ),
        array(
            'id' => 7,
            'name' => 'Pinballe'
        ),
        array(
            'id' => 8,
            'name' => 'Platformowe'
        ),
        array(
            'id' => 9,
            'name' => 'Przygodowe'
        ),
        array(
            'id' => 10,
            'name' => 'Sportowe'
        ),
        array(
            'id' => 11,
            'name' => 'Strategiczne'
        ),
        array(
            'id' => 12,
            'name' => 'Strzelanki'
        ),
        array(
            'id' => 13,
            'name' => 'Symulatory'
        ),
        array(
            'id' => 14,
            'name' => 'Zręcznościowe'
        ),
        array(
            'id' => 15,
            'name' => 'Wyścigi'
        )
    ));
}