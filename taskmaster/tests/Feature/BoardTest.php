<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Board;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BoardTest extends TestCase
{
    /**
     * A test that the board endpoint is found
     */
    public function test_it_has_board_route(): void
    {
        $board = Board::factory()->create();

        $response = $this->getJson('/api/board/' . $board->id);

        $response->assertStatus(200);
    }

    /**
     * A test that the board endpoint is found
     */
    public function test_it_has_board_data(): void
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
