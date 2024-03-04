<?php

namespace Tests\Feature;

use App\Models\Board;
use Tests\AuthTestCase;

class BoardTest extends AuthTestCase
{
    public function testItHasABoardRoute(): void
    {
        $board = Board::factory()->create();

        $response = $this->getJson('/api/board/' . $board->id);

        $response->assertStatus(200);
    }

    public function testItHasBoardData(): void
    {
        $board = Board::factory()->create();

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
}
