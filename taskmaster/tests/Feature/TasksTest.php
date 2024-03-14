<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\Board;
use Tests\AuthTestCase;

class TasksTest extends AuthTestCase
{
    public function testItHasATasksEndpoint(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->get('api/board/' . $board->id . '/tasks');

        $response->assertStatus(200);
    }

    public function testItReturnsAListOfTasks(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

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
