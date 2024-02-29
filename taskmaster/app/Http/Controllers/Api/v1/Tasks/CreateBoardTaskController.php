<?php

namespace App\Http\Controllers\Api\v1\Tasks;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Resources\v1\Tasks\TaskResource;
use App\Http\Requests\Tasks\CreateTaskRequest;
use App\Models\Board;

class CreateBoardTaskController extends Controller
{
    public function __invoke(CreateTaskRequest $request, Board $board)
    {
        $task = Task::create([
            'title' => $request->input('title'),
            'board_id' => $board->id,
        ]);

        return new TaskResource($task);
    }
}
