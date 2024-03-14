<?php

namespace App\Http\Controllers\Api\v1\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json([
                'data' => [
                    'message' => 'User tokens could not be deleted.',
                ]
            ], '400');
        }
    }
}
