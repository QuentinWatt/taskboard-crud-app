<?php

namespace App\Http\Controllers\Api\v1\Boards;

use App\Models\Board;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeleteBoardController extends Controller
{
    public function __invoke(Request $request, Board $board)
    {
        $board->delete();

        return response()->json(null, 204);
    }
}
