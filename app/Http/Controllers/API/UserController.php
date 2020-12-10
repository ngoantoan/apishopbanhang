<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

use App\Models\User;
use App\Models\SanPham;
use App\Models\SanPhamBoSuuTap;
use App\Models\ChiTietSanPham;

class UserController extends Controller
{
//    APi Khách hàng
    public function getUser()
    {
        $user = User::all();
        return response()->json($user,200);
    }

    public function dangKy(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'TenDangNhap' => 'required|unique:users,TenDangNhap',
                'email' => 'required|unique:users,email',
                'password' => 'required',
                're_password' => 'required|same:password',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }

            $input = $request->all();
            $input['password'] = bcrypt($request->get('password'));

            $user = User::create($input);

            if ($user) {
                return response()->json([
                    'user' => $user,
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
                'email' => 'required|string',
                'password' => 'required|string',
                'remember_me' => 'boolean',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }

            if (!Auth::attempt(['email' => $request->email, 'password' => $request->password, 'LoaiTaiKhoan' => [1,2]])) {
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

// API Admin
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();
        return response()->json($users,200);
    }

    public function getNhanVien()
    {
        $nhanVien = User::whereIn('LoaiTaiKhoan', ['1','2'])->orderBy('id', 'desc')->get();
        return response()->json($nhanVien,200);
    }

    public function getKhachHang()
    {
        $customers = User::where('LoaiTaiKhoan', '3')->orderBy('id', 'desc')->get();
        return response()->json($customers,200);
    }

    public function profile(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            return response()->json($user,200);
        }

        return response()->json([
            'message' => 'Vui lòng đăng nhập',
            'status' => 500
        ],500);
    }

    public function store(Request $request)
    {
        $request->validate([
            'TenDangNhap' => 'required|string|max:255',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6',
            're_password' => 'required|same:password',
            'NgaySinh' => 'date'
        ]);

        $user = new User();
        $user->HoTen            = $request->HoTen;
        $user->TenDangNhap      = $request->TenDangNhap;
        $user->email            = $request->email;
        $user->password         = bcrypt($request->password);
        $user->NgaySinh         = $request->NgaySinh;
        $user->SDT              = $request->SDT;
        $user->GioiTinh         = $request->GioiTinh;
        $user->DiaChi_ThanhPho  = $request->DiaChi_ThanhPho;
        $user->DiaChi_Quan      = $request->DiaChi_Quan;
        $user->DiaChi_SoNha     = $request->DiaChi_SoNha;
        $user->HinhAnh          = $request->HinhAnh;
        $user->LoaiTaiKhoan     = (int) $request->LoaiTaiKhoan;

        if ($user->save()) {
            return response()->json($user,200);
        } else {
            return response()->json([
                'message' => 'Tạo tài không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'HoTen' => 'required|string|max:255',
                'TenDangNhap' => 'required|string|max:255',
                'NgaySinh' => 'date',
                'SDT' => 'required|string',
                'GioiTinh' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }

            $user = User::find($id);
            if ($user->email != $request->email) {
                $request->validate([
                    'email' => 'required|unique:users,email'
                ]);

                $user->email = $request->email;
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
            $user->LoaiTaiKhoan     = (int) $request->LoaiTaiKhoan;

            if ($user->update()) {
                return response()->json($user,200);
            } else {
                return response()->json([
                    'message' => 'Cập nhật tài khoản không thành công!',
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

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user->delete()) {
            return response()->json([
                'message' => 'Xóa tài khoản thành công',
                'status' => 200
            ],200);
        }

        return response()->json([
            'message' => 'Xóa tài khoản thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }
}
