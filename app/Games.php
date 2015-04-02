<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Support\Arrayable;

class Games extends Model implements Arrayable {

    public function getGame( $slug ) {
        $game = DB::table('games')
            ->select('games.*', 'categories.name AS cat_name', 'categories.slug AS cat_slug')
            ->leftJoin('categories', 'games.category', '=', 'categories.id')
            ->where('games.slug', '=', $slug)
            ->get();

        return array_map(function($val)
        {
            return json_decode(json_encode($val), true);
        }, $game);
    }



}
