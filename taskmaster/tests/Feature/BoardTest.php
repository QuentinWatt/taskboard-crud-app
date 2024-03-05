<?php

namespace Tests\Feature;

use App\Models\Board;
use App\Models\User;
use Tests\AuthTestCase;

class BoardTest extends AuthTestCase
{
    public function testItHasABoardRoute(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->getJson('/api/board/' . $board->id);

        $response->assertStatus(200);
    }

    public function testItHasBoardData(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id
        ]);

        $response = $this->getJson('/api/board/' . $board->id);

        $response->assertJsonIsObject('data');

        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'user' => [
                    'id',
                    'name'
                ],
            ]
        ]);
    }

    public function testItHasValidationForNewBoards(): void
    {
        $response = $this->postJson('/api/board/new');

        $response->assertStatus(422);
    }

    public function testItCreatesABoard(): void
    {
        $response = $this->postJson('/api/board/new', [
            'name' => 'A test board'
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'name' => 'A test board'
            ]);
    }

    public function testItDeletesABoard(): void
    {
        $board = Board::factory()->create([
            'user_id' => $this->user->id,
        ]);

        $response = $this->deleteJson('/api/board/' . $board->id);

        $response->assertStatus(204);
    }

    public function testItCantDeleteABoardOwnedByAnotherUser(): void
    {
        $anotherUser = User::factory()->create();

        $board = Board::factory()->create([
            'user_id' => $anotherUser->id,
        ]);

        $response = $this->deleteJson('/api/board/' . $board->id);

        $response->assertStatus(403);
    }
}
