<?php

namespace Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class AuthTestCase extends BaseTestCase
{
    use CreatesApplication;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::find(1)->first();
        if (!$this->user) {
            $user = User::factory()->create();
        }
        $this->actingAs($this->user);
    }
}
