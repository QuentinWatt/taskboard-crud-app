<?php

namespace Tests\Feature;

use Tests\AuthTestCase;

class BoardsTest extends AuthTestCase
{
    public function testAuthorizedUsersCanAccessTheBoardsRoute(): void
    {
        $response = $this->getJson('/api/boards');

        $response->assertStatus(200);
    }

    public function testItReturnsAPaginatedResponse(): void
    {
        $response = $this->getJson('/api/boards');

        $response->assertJsonStructure([
            'data' => [],
            'meta',
        ]);
    }

    public function testItHasBoardProperties(): void
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
