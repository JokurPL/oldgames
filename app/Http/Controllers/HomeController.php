<?php namespace App\Http\Controllers;

use App\News;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class HomeController extends BaseController{



	public function index(Request $request, $page = 1)
	{
        $page--;


        $count = News::all()->count();

        $skip = 3 * $page;
        $news = News::orderBy('id', 'DESC')->skip($skip)->take(3)->get();



        if($request->ajax()){

            echo json_encode( array(
                'news' => $news,
                'count' => $count
            ) );

        } else {
            $page++;

            $toLeft = $page;
            $toRight = $page+1;

            $hideLeft = false;
            $hideRight = false;

            $pack = ceil( $count / 3 );

            if( $page <= 1 ) {
                $hideLeft = true;
            } else {
                $hideLeft = false;
                $toLeft--;
            }

            if( $page < $pack ) {
                $hideRight = false;
            } else {
                $hideRight = true;
            }

            $content = view('home.index', array(
                'news' => $news,
                'hideLeft' => $hideLeft,
                'hideRight' => $hideRight,
                'toLeft' => $toLeft,
                'toRight' => $toRight,
                'page' => $page,
                'pack' => $pack
            ));

            return $this->setPageContent($content);
        }

	}

}
