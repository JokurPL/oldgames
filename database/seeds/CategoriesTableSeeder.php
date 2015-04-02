<?php
/**
 * Created by PhpStorm.
 * User: dyktek
 * Date: 28/03/15
 * Time: 11:27
 */

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder {
    public function run()
    {
        // Uncomment the below to wipe the table clean before populating
        DB::table('categories')->delete();

        $categories = array(
            ['id' => 1, 'name' => 'Strategiczne', 'slug' => 'strategiczne', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 2, 'name' => 'Fpp', 'slug' => 'fpp', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 3, 'name' => 'Bijatyki', 'slug' => 'bijatyki', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 4, 'name' => 'Biznes/ekonomia', 'slug' => 'biznes-ekonomia', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 5, 'name' => 'cRPG', 'slug' => 'crpg', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 6, 'name' => 'Logiczne', 'slug' => 'logiczne', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 7, 'name' => 'Pinballe', 'slug' => 'pinballe', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 8, 'name' => 'Platformowe', 'slug' => 'platformowe', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 9, 'name' => 'Przygodowe', 'slug' => 'przygodowe', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 10, 'name' => 'Sportowe', 'slug' => 'sportowe', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 11, 'name' => 'Strzelanki', 'slug' => 'strzelanki', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 12, 'name' => 'Symulatory', 'slug' => 'symulatory', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 13, 'name' => 'Wyścigi', 'slug' => 'wyscigi', 'created_at' => new DateTime, 'updated_at' => new DateTime],
            ['id' => 14, 'name' => 'Zręcznościowe', 'slug' => 'zrecznosciowe', 'created_at' => new DateTime, 'updated_at' => new DateTime],
        );

        DB::table('categories')->insert($categories);
    }
}
