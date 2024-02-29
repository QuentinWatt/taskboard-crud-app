<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Task;
use App\Models\Board;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TasksTest extends TestCase
{
    public function test_it_has_a_tasks_endpoint(): void
    {
        $board = Board::factory()->create();

        $response = $this->get('api/board/' . $board->id . '/tasks');

        $response->assertStatus(200);
    }

    public function test_it_returns_a_list_of_tasks(): void
    {
        $board = Board::factory()->create();

        Task::factory(5)->create([
            'board_id' => $board->id
        ]);

        $response = $this->get('api/board/' . $board->id . '/tasks');

        $response->assertJsonIsArray('data');

        $response->assertJsonCount(5, 'data');

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'is_completed',
                    'created_at',
                    'updated_at'
                ]
            ]
        ]);
    }
}
