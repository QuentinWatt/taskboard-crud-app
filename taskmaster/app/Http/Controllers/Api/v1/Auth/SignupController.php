<?php

namespace App\Http\Controllers\Api\v1\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\v1\Auth\SignupRequest;
use App\Http\Resources\v1\User\UserSummaryResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class SignupController extends Controller
{
    /**
     * Sign up the user
     *
     * @param SignupRequest $request
     * @return JsonResponse
     */
    public function __invoke(SignupRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        return response()->json([
            'data' => [
                'message' => 'User created.',
                'user' => new UserSummaryResource($user),
            ]
        ], 201);
    }
}
