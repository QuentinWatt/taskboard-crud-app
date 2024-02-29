<?php

namespace App\Http\Controllers\Api\v1\Boards;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\Boards\BoardResource;
use App\Models\Board;
use Illuminate\Http\Request;

class ShowBoardController extends Controller
{
    /**
     * Invokable controller returning an API resource
     */
    public function __invoke(Board $board)
    {
        return new BoardResource($board);
    }
}
