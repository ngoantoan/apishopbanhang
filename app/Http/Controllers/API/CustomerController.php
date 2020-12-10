<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\User;

class CustomerController extends Controller
{
    public function dangKy(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'TenDangNhap' => 'required|unique:users,TenDangNhap',
                'email' => 'required|unique:users,email',
                'password' => 'required',
                'GioiTinh' => 'required',
                'SDT' => 'required|numeric',
                'DiaChi_ThanhPho' => 'required|string',
                'DiaChi_Quan' => 'required|string',
                'DiaChi_SoNha' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }


            $user = new User();
            $user->TenDangNhap = $request->TenDangNhap;
            $user->email = $request->email;
            $user->password = bcrypt($request->get('password'));
            $user->GioiTinh = $request->GioiTinh;
            $user->SDT = $request->SDT;
            $user->DiaChi_ThanhPho = $request->DiaChi_ThanhPho;
            $user->DiaChi_Quan = $request->DiaChi_Quan;
            $user->DiaChi_SoNha = $request->DiaChi_SoNha;

            if ($user->save()) {
                return response()->json([
                    'message' => 'Đăng ký thành công',
                    'status' => 200
                ],200);
            } else {
                return response()->json([
                    'message' => 'Đăng ký không thành công',
                    'status' => 500
                ],500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function dangNhap(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }

            if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                return response()->json([
                    'message' => 'Tài khoản hoặc mật khẩu không đúng!',
                    'status' => 401
                ],401);
            }

            $user = Auth::user();
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            if ($request->has('remember_me')) {
                $token->expires_at = Carbon::now()->addWeeks(1);
            }

            $token->save();
            $user->token_type = 'Bearer ';
            $user->access_token = $tokenResult->accessToken;
            $user->expires_at = Carbon::parse($tokenResult->token->expires_at)->toDateTimeString();
            $user->store;

            return response()->json([
                'user' => $user,
                'message' => 'Đăng nhập thành công',
                'status' => 200
            ],200);

        } catch(\ Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function dangXuat(Request $request)
    {
        try {
            $user = Auth::user();
            $user->token()->revoke();
            return response()->json([
                'message' => 'Đăng xuất thành công',
                'status' => 200
            ],200);
        } catch(\Exception $e) {
            return $this->error($e);
        }
    }

    public function updateProfileCustomer(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'HoTen' => 'required|string|max:255',
                'TenDangNhap' => 'required|string|max:255',
                'NgaySinh' => 'date',
                'SDT' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }

            $user = User::find($id);
            if ($request->email) {
                if ($user->email != $request->email) {
                    $request->validate([
                        'email' => 'required|unique:users,email'
                    ]);

                    if ($validator->fails()) {
                        return response()->json([
                            'message' => $validator->errors(),
                            'status' => 401
                        ],401);
                    }

                    $user->email = $request->email;
                }
            }

            $user->HoTen             = $request->HoTen;
            $user->TenDangNhap       = $request->TenDangNhap;
            $user->NgaySinh          = $request->NgaySinh;
            $user->SDT               = $request->SDT;
            $user->GioiTinh          = $request->GioiTinh;
            $user->DiaChi_ThanhPho   = $request->DiaChi_ThanhPho;
            $user->DiaChi_Quan       = $request->DiaChi_Quan;
            $user->DiaChi_SoNha      = $request->DiaChi_SoNha;
            $user->HinhAnh           = $request->HinhAnh;

            if ($user->update()) {
                return response()->json([
                    'message' => 'Cập nhật tài khoản thành công!',
                    'status' => 200
                ],200);
            } else {
                return response()->json([
                    'message' => 'Cập nhật tài khoản thất bại!',
                    'status' => 500
                ],500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }
}
