<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Slider;
use App\Models\SanPham;
use App\Models\BoSuuTap;
use App\Models\ChiTietHoaDon;

class DashboardController extends Controller
{
// API khách hàng
    public function dashboard()
    {
        try {
            $sliders = Slider::get();
            $boSuuTap = BoSuuTap::get();
            $danhSachSanPham = DB::table('san_pham')
                            ->select('san_pham.*', 'loai_san_pham.Ten as TenLoaiSanPham')
                            ->join('loai_san_pham', 'loai_san_pham.id', '=', 'san_pham.MaLoaiSanPham')
                            ->orderBy('rating', 'desc')
                            ->limit(20)
                            ->get();

            return response()->json([
                'sliders' => $sliders,
                'danhSachSanPham' => $danhSachSanPham,
                'danhSachBoSuuTap' => $boSuuTap,
                'status' => 200
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

// API Admin
    public function quarterlyStatistics()
    {
        $year = date("Y");
        $thang1 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '1')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang1 = 0;
        foreach ($thang1 as $value) {
            $priceThang1 += ($value->Gia * $value->SoLuong);
        }

        $thang2 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '2')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang2 = 0;
        foreach ($thang2 as $value) {
            $priceThang2 += ($value->Gia * $value->SoLuong);
        }
        $thang3 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '3')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang3 = 0;
        foreach ($thang3 as $value) {
            $priceThang3 += ($value->Gia * $value->SoLuong);
        }
        $thang4 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '4')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang4 = 0;
        foreach ($thang4 as $value) {
            $priceThang4 += ($value->Gia * $value->SoLuong);
        }
        $thang5 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '5')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang5 = 0;
        foreach ($thang5 as $value) {
            $priceThang5 += ($value->Gia * $value->SoLuong);
        }
        $thang6 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '6')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang6 = 0;
        foreach ($thang6 as $value) {
            $priceThang6 += ($value->Gia * $value->SoLuong);
        }
        $thang7 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '7')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang7 = 0;
        foreach ($thang7 as $value) {
            $priceThang7 += ($value->Gia * $value->SoLuong);
        }
        $thang8 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '8')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang8 = 0;
        foreach ($thang8 as $value) {
            $priceThang8 += ($value->Gia * $value->SoLuong);
        }
        $thang9 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '9')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang9 = 0;
        foreach ($thang9 as $value) {
            $priceThang9 += ($value->Gia * $value->SoLuong);
        }
        $thang10 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong', 'chi_tiet_hoa_don.id')
                ->whereMonth('chi_tiet_hoa_don.created_at', '10')
                ->whereYear('chi_tiet_hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang10 = 0;
        foreach ($thang10 as $value) {
            $priceThang10 += ($value->Gia * $value->SoLuong);
        }
        $thang11 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '11')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang11 = 0;

        foreach ($thang11 as $value) {
            $priceThang11 += ($value->Gia * $value->SoLuong);
        }
        $thang12 = DB::table('chi_tiet_hoa_don')
                ->join('hoa_don', 'hoa_don.id', 'chi_tiet_hoa_don.MaHoaDon')
                ->select('Gia', 'SoLuong')
                ->whereMonth('hoa_don.created_at', '12')
                ->whereYear('hoa_don.created_at', $year)
                ->where('hoa_don.TrangThai', '5')
                ->get();
        $priceThang12 = 0;
        foreach ($thang12 as $value) {
            $priceThang12 += ($value->Gia * $value->SoLuong);
        }
        $quy1 = $priceThang1 + $priceThang2 + $priceThang3;
        $quy2 = $priceThang4 + $priceThang5 + $priceThang6;
        $quy3 = $priceThang7 + $priceThang8 + $priceThang9;
        $quy4 = $priceThang10 + $priceThang11 + $priceThang12;

        $data = [$quy1, $quy2, $quy3, $quy4];
        return response()->json($data,200);
    }

    public function categorytStatistics()
    {
        $categorytStatistics = DB::table('chi_tiet_hoa_don')
                            ->join('hoa_don', 'hoa_don.id', '=', 'chi_tiet_hoa_don.MaHoaDon')
                            ->join('chi_tiet_san_pham', 'chi_tiet_san_pham.id', '=', 'chi_tiet_hoa_don.MaChiTietSP')
                            ->join('san_pham', 'san_pham.id', '=', 'chi_tiet_san_pham.MaSP')
                            ->join('loai_san_pham', 'loai_san_pham.id', '=', 'san_pham.MaLoaiSanPham')
                            ->select('loai_san_pham.Ten', 'chi_tiet_hoa_don.Gia', 'chi_tiet_hoa_don.SoLuong')
                            ->where('hoa_don.TrangThai', '5')
                            ->get();

        $arrTen = [];
        $arrPrice = [];

        $loaiSanPham = DB::table('loai_san_pham')->select('Ten')->get();

        foreach ($loaiSanPham as $val) {
            $arrTen[] = $val->Ten;
            $arrPrice[] = 0;
        }


        foreach ($categorytStatistics as $category) {
            foreach ($arrTen as $key => $val) {
                if ($category->Ten == $val) {
                    $arrPrice[$key] += $category->Gia * $category->SoLuong;
                }
            }
        }

        return response()->json([
            'arrTen' => $arrTen,
            'arrPrice' => $arrPrice
        ],200);
    }
}
