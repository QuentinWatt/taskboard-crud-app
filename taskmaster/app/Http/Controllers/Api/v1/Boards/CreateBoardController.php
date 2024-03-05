<?php

namespace App\Http\Controllers\Api\v1\Boards;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Boards\CreateBoardRequest;
use App\Http\Resources\v1\Boards\BoardResource;
use App\Models\Board;

class CreateBoardController extends Controller
{
    public function __invoke(CreateBoardRequest $request): BoardResource
    {
        $board = Board::create([
            'name' => $request->input('name'),
            'user_id' => $request->user()->id
        ]);

        return new BoardResource($board);
    }
}
