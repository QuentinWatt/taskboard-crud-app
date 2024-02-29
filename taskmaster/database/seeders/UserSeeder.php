<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Test User 1',
                'email' => 'user@taskmaster.test',
            ],
            [
                'name' => 'Test User 2',
                'email' => 'user2@taskmaster.test',
            ]
        ];

        collect($users)->each(function ($user) {
            User::factory()->create();
        });
    }
}
