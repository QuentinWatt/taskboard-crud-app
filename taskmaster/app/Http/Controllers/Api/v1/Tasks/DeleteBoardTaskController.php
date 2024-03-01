<?php

namespace App\Http\Controllers\Api\v1\Tasks;

use App\Models\Task;
use App\Models\Board;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class DeleteBoardTaskController extends Controller
{
    public function __invoke(Board $board, Task $task): JsonResponse
    {
        $task->delete();

        return response()->json(null, 200);
    }
}
