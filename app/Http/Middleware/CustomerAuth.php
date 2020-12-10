<?php

namespace App\Http\Middleware;

use Closure;

class CustomerAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!session()->has('user')) {
            return response()->json([
                'message' => "Vui lòng đằng nhập !! ",
                'status'    => 403
            ], 403);
        }
        return $next($request);
    }
}
