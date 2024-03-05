<?php

namespace App\Http\Controllers\Api\v1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\User\UserSummaryResource;
use Illuminate\Http\Request;

class ShowAuthUserController extends Controller
{
    public function __invoke(Request $request): UserSummaryResource
    {
        return new UserSummaryResource($request->user());
    }
}
