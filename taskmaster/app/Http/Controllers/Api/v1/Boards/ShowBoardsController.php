<?php

namespace App\Http\Controllers\Api\v1\Boards;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\Boards\BoardResourceCollection;
use Illuminate\Http\Request;

class ShowBoardsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $boards = $request->user()->boards()->latest()->paginate(10);

        return new BoardResourceCollection($boards);
    }
}
