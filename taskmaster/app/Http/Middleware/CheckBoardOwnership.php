<?php

namespace App\Http\Middleware;

use App\Models\Board;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckBoardOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $board = $request->route('board');

        if ($board && $request->user()) {
            if ($board->user->id == $request->user()->id) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Not allowed.'], 403);
    }
}
