<?php

namespace App\Http\Controllers\Api\v1\Tasks;

use App\Models\Board;
use App\Http\Controllers\Controller;
use App\Http\Resources\v1\Tasks\TaskResourceCollection;

class ShowBoardTasksController extends Controller
{
    public function __invoke(Board $board)
    {
        return new TaskResourceCollection($board->tasks);
    }
}
