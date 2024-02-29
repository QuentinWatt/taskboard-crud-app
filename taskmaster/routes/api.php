<?php

use App\Http\Controllers\Api\v1\Boards\ShowBoardController;
use App\Http\Controllers\Api\v1\Boards\ShowBoardsController;
use App\Http\Controllers\Api\v1\Tasks\ShowBoardTasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * I really like using invokable controllers. They only do 1 thing,
 * which follows the idea of Single Responsibility. I understand that 
 * this is a personal preference and of course I can use API resource routes.
 */

Route::get('/boards', ShowBoardsController::class)->name('boards.show');

Route::prefix('board')->group(function () {
    Route::prefix('/{board}')->group(function () {
        Route::get('/', ShowBoardController::class)->name('board.show');

        Route::get('/tasks', ShowBoardTasksController::class)->name('board.tasks.show');
    });
});
