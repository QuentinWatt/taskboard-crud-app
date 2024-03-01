<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Task;
use App\Models\Board;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_it_has_validation_on_an_empty_title(): void
    {
        $board = Board::factory()->create();
        $response = $this->postJson('/api/board/' . $board->id . '/task/new', [
            'title' => null,
        ]);

        $response->assertStatus(422);

        $response->assertJsonFragment([
            'message' => 'The title field is required.',
            'errors' => [
                'title' => [
                    'The title field is required.'
                ]
            ],
        ]);
    }

    public function test_it_has_validation_on_a_false_value(): void
    {
        $board = Board::factory()->create();
        $response = $this->postJson('/api/board/' . $board->id . '/task/new', [
            'title' => false,
        ]);

        $response->assertStatus(422);

        $response->assertJsonFragment([
            'message' => 'The title field must be a string. (and 1 more error)',
            'errors' => [
                'title' => [
                    'The title field must be a string.',
                    'The title field must be at least 1 characters.'
                ]
            ],
        ]);
    }

    public function test_it_has_validation_on_long_value(): void
    {
        $board = Board::factory()->create();
        $response = $this->postJson('/api/board/' . $board->id . '/task/new', [
            'title' => 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, quis. Quos minus aspernatur perferendis unde vero? Voluptas inventore totam consequatur neque debitis quasi ratione nostrum facilis, reprehenderit vitae ab distinctio.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, quis. Quos minus aspernatur perferendis unde vero? Voluptas inventore totam consequatur neque debitis quasi ratione nostrum facilis, reprehenderit vitae ab distinctio.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat, quis. Quos minus aspernatur perferendis unde vero? Voluptas inventore totam consequatur neque debitis quasi ratione nostrum facilis, reprehenderit vitae ab distinctio.',
        ]);

        $response->assertStatus(422);

        $response->assertJsonFragment([
            'message' => 'The title field must not be greater than 255 characters.',
            'errors' => [
                'title' => [
                    'The title field must not be greater than 255 characters.',
                ]
            ],
        ]);
    }

    public function test_it_creates_a_task(): void
    {
        $board = Board::factory()->create();
        $response = $this->postJson('/api/board/' . $board->id . '/task/new', [
            'title' => 'Test Task',
        ]);

        $response->assertStatus(201);

        $response->assertJsonFragment([
            'title' => 'Test Task',
            'is_completed' => false
        ]);
    }

    public function test_it_can_delete_a_task(): void
    {
        $board = Board::factory()->create();
        $task = Task::factory()->create([
            'title' => 'A task to delete',
            'board_id' => $board->id,
        ]);

        $this->assertDatabaseHas('tasks', [
            'id' => $task->id,
            'title' => 'A task to delete',
            'board_id' => $board->id,
        ]);

        $response = $this->deleteJson('/api/board/' . $board->id . '/task/' . $task->id);

        $response->assertOk();

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
            'title' => 'A task to delete',
            'board_id' => $board->id,
        ]);
    }
}
