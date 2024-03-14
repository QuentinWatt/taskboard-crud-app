<?php

namespace App\Http\Controllers\Api\v1\Tasks;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Tasks\UpdateTaskRequest;
use App\Http\Resources\v1\Tasks\TaskResource;
use App\Models\Board;
use App\Models\Task;

class UpdateBoardTaskController extends Controller
{
    /**
     * Update the task
     *
     * @param UpdateTaskRequest $request
     * @param Board $board
     * @param Task $task
     * @return TaskResource
     */
    public function __invoke(
        UpdateTaskRequest $request,
        Board $board,
        Task $task
    ): TaskResource {
        $task->update([
            'title' => $request->input('title'),
            'is_completed' => $request->input('is_completed'),
        ]);

        return new TaskResource($task->refresh());
    }
}
