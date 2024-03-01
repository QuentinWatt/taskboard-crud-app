<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BoardsTest extends TestCase
{
    /**
     * A test that the boards endpoint is found
     */
    public function test_it_has_boards_route(): void
    {
        $response = $this->getJson('/api/boards');

        $response->assertStatus(200);
    }

    public function test_it_returns_a_paginated_response(): void
    {
        $response = $this->getJson('/api/boards');

        $response->assertJsonStructure([
            'data' => [],
            'meta',
        ]);
    }

    public function test_it_has_board_key_properties(): void
    {
        $response = $this->getJson('/api/boards');

        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'name',
                    'user' => [
                        'id',
                        'name'
                    ],
                ]
            ],
        ]);
    }
}
