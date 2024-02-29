<?php

namespace App\Http\Controllers\Api\v1\Boards;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\Boards\BoardResourceCollection;
use App\Models\Board;

class ShowBoardsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $boards = Board::paginate(10);

        return new BoardResourceCollection($boards);
    }
}
