<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::get('/', 'HomeController@index');

Route::get('/home/contact', 'HomeController@contact');
Route::post('/home/contact', 'HomeController@contact');
Route::get('/home/{page}', 'HomeController@index');


Route::get('/categories', 'CategoriesController@index');
Route::get('/categories/{slug}/{page?}', 'CategoriesController@slug');

Route::get('/game/download/{slug}', 'GameController@download');
Route::get('/game/{slug}', 'GameController@index');

Route::get('/page/{slug}', 'PageController@index');