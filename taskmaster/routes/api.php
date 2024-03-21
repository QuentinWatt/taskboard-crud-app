<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\Auth\LoginController;
use App\Http\Controllers\Api\v1\Auth\LogoutController;
use App\Http\Controllers\Api\v1\Auth\SignupController;
use App\Http\Controllers\Api\v1\Boards\ShowBoardController;
use App\Http\Controllers\Api\v1\Auth\ShowAuthUserController;
use App\Http\Controllers\Api\v1\Boards\ShowBoardsController;
use App\Http\Controllers\Api\v1\Boards\CreateBoardController;
use App\Http\Controllers\Api\v1\Boards\DeleteBoardController;
use App\Http\Controllers\Api\v1\Tasks\ShowBoardTasksController;
use App\Http\Controllers\Api\v1\Tasks\CreateBoardTaskController;
use App\Http\Controllers\Api\v1\Tasks\DeleteBoardTaskController;
use App\Http\Controllers\Api\v1\Tasks\UpdateBoardTaskController;

Route::get('/test', function() {
    return response()->json([
        'message' => 'up'
    ]);
});

Route::prefix('/auth')->group(function () {
    Route::post('/signup', SignupController::class);
    Route::post('/login', LoginController::class);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', LogoutController::class);
        Route::get('/user', ShowAuthUserController::class);
    });
});

/**
 * I really like using invokable controllers. They only do 1 thing,
 * which follows the idea of Single Responsibility. I understand that 
 * this is a personal preference and of course I can use API resource routes.
 * 
 * Fully aware that boards and tasks can use these types of routes:
 * https://laravel.com/docs/10.x/controllers#restful-partial-resource-routes
 */
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/boards', ShowBoardsController::class)->name('boards.show');

    Route::post('/board/new', CreateBoardController::class)->name('board.create');

    Route::middleware('check.board.ownership')->prefix('board')->group(function () {
        Route::prefix('/{board}')->group(function () {
            Route::get('/', ShowBoardController::class)->name('board.show');
            Route::delete('/', DeleteBoardController::class)->name('board.delete');

            Route::get('/tasks', ShowBoardTasksController::class)->name('board.tasks.show');
            Route::post('/task/new', CreateBoardTaskController::class)->name('board.task.create');
            Route::delete('/task/{task}', DeleteBoardTaskController::class)->name('board.task.delete');
            Route::put('/task/{task}', UpdateBoardTaskController::class)->name('board.task.update');
        });
    });
});
