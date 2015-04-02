<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGames extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('games', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('name')->default('');
            $table->string('slug')->default('');
            $table->text('description')->default('');
            $table->string('producer')->default('');
            $table->string('screen')->default('');
            $table->string('platform')->default('');
            $table->smallInteger('year')->default(0);
            $table->integer('vote')->default(0);
            $table->integer('vote_count')->default(0);
            $table->integer('downloaded')->default(0);
            $table->string('file')->default('');
            $table->integer('category')->default(0);

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('games');
	}

}
