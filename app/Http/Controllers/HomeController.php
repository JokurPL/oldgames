<?php namespace App\Http\Controllers;

use App\News;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use PhpSpec\Exception\Exception;

class HomeController extends BaseController{



	public function index(Request $request, $page = 1)
	{
        $page = intval($page);

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

    public function contact(Request $request) {

        if( $request->isMethod('post') && $request->ajax() ) {
            Mail::send('home.email',
                array(
                    'email' => $request->input('email'),
                    'user_message' => $request->get('text')
                ), function ($message) {
                    $message->to('krzysiek@dyk.pl', 'Krzysiek')->subject('Kontakt - staregry.dyk.pl');
                });

            echo json_encode(array(
                'status' => 0
            ));
        }

        if( !$request->ajax() ) {
            $content = view('home.contact', array(
                'token' => csrf_token()
            ));

            return $this->setPageContent($content);
        }
    }

}
