<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GioHang;
use Illuminate\Support\Facades\DB;

class GioHangController extends Controller
{
// API khách hàng
    public function themGioHang(Request $request)
    {
        try {
            $gioHang = GioHang::where('MaChiTietSanPham', $request->MaChiTietSanPham)
                            ->where('MaKhachHang', $request->MaKhachHang)
                            ->first();

            if ($gioHang) {
                $gioHang->SoLuong += $request->SoLuong;

                if ($gioHang->save()) {
                    return response()->json([
                        'message' => 'thêm vào giỏ hàng thành công',
                        'status' => 200
                    ],200);
                }

                return response()->json([
                    'message' => 'thêm vào giỏ hàng thất bại',
                    'status' => 500
                ],500);
            }

            $newGioHang = new GioHang();
            $newGioHang->MaChiTietSanPham = $request->MaChiTietSanPham;
            $newGioHang->MaKhachHang = $request->MaKhachHang;
            $newGioHang->SoLuong = $request->SoLuong;

            if ($newGioHang->save()) {
                return response()->json([
                    'message' => 'thêm vào giỏ hàng thành công',
                    'status' => 200
                ],200);
            }

            return response()->json([
                'message' => 'thêm vào giỏ hàng thất bại',
                'status' => 500
            ],500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function danhSachGioHang(Request $request)
    {
        $danhSachGioHang = DB::table('gio_hang')
                            ->join('chi_tiet_san_pham', 'chi_tiet_san_pham.id', '=', 'gio_hang.MaChiTietSanPham')
                            ->join('san_pham', 'san_pham.id', '=', 'chi_tiet_san_pham.MaSP')
                            ->select('gio_hang.*', 'chi_tiet_san_pham.KichThuoc', 'chi_tiet_san_pham.Mau', 'san_pham.AnhChinh', 'san_pham.DongGia', 'san_pham.TenSP', 'san_pham.MoTa')
                            ->where('gio_hang.MaKhachHang', $request->MaKhachHang)
                            ->get();

        return response()->json([
            'danhSachGioHang' => $danhSachGioHang,
            'status' => 200
        ],200);
    }

    public function xoaGioHang(Request $request)
    {
        try {
            $id = $request->id;
            $gioHang = GioHang::where('id', $id)->first();
            if ($gioHang->delete()) {
                return response()->json([
                    'message' => 'Xóa sản phẩm trong giỏ hàng thành công',
                    'status' => 200
                ],200);
            }

            return response()->json([
                'message' => 'thêm vào giỏ hàng thất bại',
                'status' => 500
            ],500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function capNhatGioHang(Request $request)
    {
        try {
            $id = $request->id;
            $gioHang = GioHang::where('id', $id)->first();
            $gioHang->SoLuong = $request->SoLuong;
            if ($gioHang->save()) {
                return response()->json([
                    'message' => 'Cập nhật giỏ hàng thành công',
                    'status' => 200
                ],200);
            }

            return response()->json([
                'message' => 'Cập nhật giỏ hàng thất bại',
                'status' => 500
            ],500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }
}
