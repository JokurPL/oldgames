<?php namespace App\Http\Controllers;

use App\Pages;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class PageController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(Request $request, $slug)
	{
        $page = Pages::whereSlug( $slug )->first();


        if($request->ajax()){

            echo json_encode( $page );

        } else {

            $content = view('pages.index', $page);

            return $this->setPageContent(
                $content,
                $page['name'],
                $page['name'],
                $page['name']
            );
        }

	}

}
