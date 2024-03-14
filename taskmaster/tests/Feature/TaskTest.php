<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\Board;
use Tests\AuthTestCase;

class TaskTest extends AuthTestCase
{
    public function testItHasValidationForEmptyValues(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

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

    public function testItHasValidationForTrueOrFalseValues(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

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

    public function testItHasValidationForALongValue(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

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

    public function testItCreatesATask(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->postJson('/api/board/' . $board->id . '/task/new', [
            'title' => 'Test Task',
        ]);

        $response->assertStatus(201);

        $response->assertJsonFragment([
            'title' => 'Test Task',
            'is_completed' => false
        ]);
    }

    public function testItCanDeleteATask(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

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

        $response->assertStatus(204);

        $this->assertDatabaseMissing('tasks', [
            'id' => $task->id,
            'title' => 'A task to delete',
            'board_id' => $board->id,
        ]);
    }

    public function testItHasValidationForUpdates(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

        $task = Task::factory()->create([
            'title' => 'A task to delete',
            'board_id' => $board->id,
        ]);

        $response = $this->putJson('/api/board/' . $board->id . '/task/' . $task->id, [
            'title' => null,
        ]);

        $response->assertStatus(422)
            ->assertJsonFragment([
                'errors' => [
                    'title' => [
                        'The title field is required.'
                    ],
                    'is_completed' => [
                        'The is completed field is required.'
                    ],
                ]
            ]);
    }
}
