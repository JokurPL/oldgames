<?php namespace App\Http\Controllers;

use App\Games;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Response;

class GameController extends BaseController {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(Request $request, $slug)
    {
        $Games = new Games();
        $game = $Games->getGame( $slug );
        $game = $game[0];

        if($request->ajax()){

            echo json_encode( $game );

        } else {

            $content = view('games.index', $game);

            return $this->setPageContent($content, $game['name'] . ' - ' . $game['cat_name'],  'Stara gra ' . $game['name'] . ' z kategorii ' . $game['cat_name']);
        }

    }

    public function download($slug) {

        $Games = new Games();
        $game = $Games->getGame( $slug );
        $game = $game[0];

        $file = getcwd() . '/../content/' . mb_strtolower( $game['platform'] ) . '/' . $game['file'];


        if( file_exists( $file ) && $game['file'] != '' ) {
            return Response::download( $file, basename( $file ) );
        } else {

            $content = view('games.download', $game);

            return $this->setPageContent($content, 'Pobierz - ' . $game['name'] . ' - ' . $game['cat_name'],  'Stara gra ' . $game['name'] . ' z kategorii ' . $game['cat_name']);

        }



    }

}
