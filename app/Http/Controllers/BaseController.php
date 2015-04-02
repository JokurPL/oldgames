<?php
/**
 * Created by PhpStorm.
 * User: dyktek
 * Date: 28/03/15
 * Time: 15:52
 */

namespace App\Http\Controllers;

use Exception;


class BaseController extends Controller
{
    protected $layout = 'layouts.default';

    protected function setPageContent(  $content, $title = false, $keywords = false, $description = false )
    {
        $titleAdd = 'Stare gry, za darmo, mario, download, klasyka gier, abandonware, pc, pegasus, commodore, atari, staregry.dyk.pl';
        $keywordsAdd = 'stare gry, klasyka gier, stare gry na pc-ta, gry, old games, commodore, atarii, pegasus';

        $title = ($title) ? $title . ' - ' . $titleAdd : $titleAdd;
        $keywords = ($title) ? $keywords . ', ' . $keywordsAdd : $keywordsAdd;
        $description = ($description) ? $description : 'stare gry, klasyka gier, stare gry na pc-ta, gry, old games, commodore, atarii, pegasus';

        if (is_null($this->layout))
        {
            throw new Exception('layout was not set');
        }
        return view($this->layout, ['content' => $content, 'title' => $title, 'description' => $description, 'keywords' => $keywords]);
    }
}