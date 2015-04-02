<?php namespace App\Http\Controllers;

use App\Categories;
use App\Games;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class CategoriesController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index(Request $request)
	{


        $categories = Categories::orderBy('name', 'ASC')->get();

        if( $request->ajax() ) {

            echo json_encode( $categories );

        } else {
            $content = view('categories.index', array(
                'categories' => $categories
            ));

           // echo implode( ',',$categories->toArray() );

            $keys = '';
            foreach( $categories->toArray() as $val ) {
                $keys .= empty( $keys ) ? $val['name'] : ',' . $val['name'];
             }

            return $this->setPageContent($content, 'Kategorie gier', $keys );
        }

	}

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function slug(Request $request, $slug, $page = 1)
    {
        $category = Categories::whereSlug($slug)->first();

        $count = Games::whereCategory($category->id)->count();

        $page--;

        $skip = 30 * $page;

        $games = Games::whereCategory($category->id)->skip($skip)->take(30)->get();


        if( $request->ajax() ) {

            echo json_encode( array(
                'games' => $games,
                'count' => $count,
                'categoryName' => $category->name
            ) );

        } else {

            $page++;

            $toLeft = $page;
            $toRight = $page+1;

            $hideLeft = false;
            $hideRight = false;

            $pack = ceil( $count / 30 );

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

            $content = view('games.list', array(
                'games' => $games,
                'hideLeft' => $hideLeft,
                'hideRight' => $hideRight,
                'toLeft' => $toLeft,
                'toRight' => $toRight,
                'page' => $page,
                'pack' => $pack,
                'slug' => $slug
            ));


            return $this->setPageContent($content, $category->name, $category->name, 'Kategoria starych gier ' . $category->name );
        }

    }

}
