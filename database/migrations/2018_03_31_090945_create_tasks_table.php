<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Task;
class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('task');
            $table->string('description');
            $table->timestamps();
        });
        Task::create([
            'task' => 'Weekend hookup',
            'description' => 'Call Helga in the afternoon',
        ]);

        Task::create([
            'task' => 'Late night coding',
            'description' => 'Finishing coding POS API',
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
