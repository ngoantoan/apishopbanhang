<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Session;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
                'status' => 401
            ],401);
        }

        $input = $request->all();
        $user = User::where('email',$input['email'])->first();

        if ($user) {
            if (($user->LoaiTaiKhoan != "administrator") || ($user->password != Hash::check($input['password'], $user->password))) {
                return response()->json([
                    'message' => 'Tài khoản hoặc mật khẩu không đúng!',
                    'status_code' => 401
                ],401);
            } else {
                session(['user' => $user]);
                return response()->json([
                    'user' => $user,
                    'message' => 'Đăng nhập thành công',
                    'status_code' => 401
                ],200);
            }
        } else {
            return response()->json([
                'message' => 'Tài khoản hoặc mật khẩu không đúng!',
                'status_code' => 401
            ],401);
        }
    }

    public function logout()
    {
        Session::forget('user');
        return response()->json([
            'message' => 'Đăng xuất thành công',
            'status' => 200
        ],200);
    }

    function test()
    {
        return response()->json('test',200);
    }
}
