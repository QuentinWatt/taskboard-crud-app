<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\Board;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $boards = Board::factory(5)->create();

        collect($boards)->each(function ($board) {
            Task::factory(10)->create([
                'board_id' => $board->id,
            ]);
        });
    }
}
