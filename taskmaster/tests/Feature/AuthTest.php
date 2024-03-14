<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthTest extends TestCase
{
    public function testItHasASignUpRouteWithValidation(): void
    {
        $response = $this->postJson('/api/auth/signup');

        $response->assertStatus(422)
            ->assertJsonFragment([
                "errors" => [
                    "name" => [
                        "The name field is required."
                    ],
                    "email" => [
                        "The email field is required."
                    ],
                    "password" => [
                        "The password field is required."
                    ]
                ]
            ]);
    }

    public function testAUserCanSignUp(): void
    {
        $response = $this->postJson('/api/auth/signup', [
            'name' => fake()->name(),
            'email' => fake()->email(),
            'password' => 'password',
        ]);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'message' => 'User created.'
            ]);
    }
}
