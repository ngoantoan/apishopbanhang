<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use App\Models\SanPham;
use App\Models\ChiTietSanPham;
use App\Models\SanPhamBoSuuTap;
use App\Models\DeliveryAddress;
use App\Models\HoaDon;
use App\Models\ChiTietHoaDon;

class SanPhamController extends Controller
{
// API Admin
    public function index()
    {
        $listSanPham = SanPham::with('loaiSanPham')->get();
        return response()->json($listSanPham,200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'MaLoaiSanPham' => 'required',
            'TenSP' => 'required|string|unique:san_pham,TenSP|max:255',
            'MoTa' => 'required|string',
            // 'AnhChinh' => 'required|image|mimes:jpeg,png,jpg',
            'AnhChinh' => 'required|string',
            'DongGia' => 'required|numeric',
        ]);

        $sanPham = new SanPham();

        $sanPham->MaLoaiSanPham = $request->MaLoaiSanPham;
        $sanPham->TenSP = $request->TenSP;
        $sanPham->MoTa = $request->MoTa;
        $sanPham->DongGia = $request->DongGia;
        $sanPham->AnhChinh = $request->AnhChinh;

        // $imageName = time().'.'.$request->AnhChinh->extension();

        // $request->AnhChinh->move(public_path('images/san-pham'), $imageName);

        // $sanPham->AnhChinh = 'images/san-pham/' . $imageName;

        if ($sanPham->save()) {
            $sanPham = SanPham::with('loaiSanPham')->find($sanPham->id);
            return response()->json($sanPham,200);
        } else {
            return response()->json([
                'message' => 'Tạo sản phẩm không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'MaLoaiSanPham' => 'required|numeric',
            'TenSP' => 'required|string|max:255',
            'MoTa' => 'required|string',
            'DongGia' => 'required|numeric',
        ]);

        $sanPham = SanPham::find($id);

        $sanPham->MaLoaiSanPham = $request->MaLoaiSanPham;
        $sanPham->TenSP = $request->TenSP;
        $sanPham->MoTa = $request->MoTa;
        $sanPham->DongGia = $request->DongGia;
        $sanPham->AnhChinh = $request->AnhChinh;

        // $oldPath = $sanPham->AnhChinh;

        // if ($request->hasFile('AnhChinh')) {
        //     $request->validate([
        //         'AnhChinh' => 'required|image|mimes:jpeg,png,jpg',
        //     ]);

        //     $imageName = time().'.'.$request->AnhChinh->extension();
        //     $request->AnhChinh->move(public_path('images/san-pham'), $imageName);
        //     $sanPham->AnhChinh = 'images/san-pham/' . $imageName;

        //     unlink($oldPath);
        // }

        if ($sanPham->update()) {
            $sanPham = SanPham::with('loaiSanPham')->find($sanPham->id);
            return response()->json($sanPham,200);
        } else {
            // unlink($imageName);
            return response()->json([
                'message' => 'Cập nhật loại phẩm không thất bại!',
                'status' => 500
            ],500);
        }
    }

    public function destroy($id)
    {
        $chiTietSanPham = ChiTietSanPham::where('MaSP', $id)->first();
        if ($chiTietSanPham) {
            return response()->json([
                'message' => 'Vui lòng xóa chi tiết sản phẩm trước!',
                'status' => 500
            ],500);
        }

        $sanPham = SanPham::find($id);
        if ($sanPham->delete()) {
            // unlink($sanPham->AnhChinh);
            return response()->json([
                'message' => 'Xóa sản phẩm thành công',
                'status' => 200
            ],200);
        }

        return response()->json([
            'message' => 'Xóa sản phẩm thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }

    // chi tiết sản phẩm
    public function danhSachChiTietSanPham($id)
    {
        $sanPham = SanPham::find($id);
        if (!$sanPham) {
            return response()->json([
                'message' => 'ID sản phẩm không tồn tại',
                'status' => 500
            ],500);
        }

        $danhSachChiTietSanPham = ChiTietSanPham::where('MaSP', $id)->get();
        return response()->json($danhSachChiTietSanPham,200);
    }

    public function themChiTietSanPham(Request $request)
    {
        $request->validate([
            'MaSP' => 'required|numeric',
            'KichThuoc' => 'required',
            'Mau' => 'required',
            'MoTa' => 'required|string'
        ]);

        $sanPham = SanPham::find($request->MaSP);
        if (!$sanPham) {
            return response()->json([
                'message' => 'ID sản phẩm không tồn tại',
                'status' => 500
            ],500);
        }

        $chietTiet = ChiTietSanPham::where('KichThuoc', $request->KichThuoc)->where('Mau', $request->Mau)->first();
        if ($chietTiet) {
            return response()->json([
                'message' => 'Kích thước và màu này đã tồn tại',
                'status' => 500
            ],500);
        }

        $chiTietSanPham = new ChiTietSanPham();
        $chiTietSanPham->MaSP = $request->MaSP;
        $chiTietSanPham->KichThuoc = $request->KichThuoc;
        $chiTietSanPham->Mau = $request->Mau;
        $chiTietSanPham->MoTa = $request->MoTa;

        if ($chiTietSanPham->save()) {
            return response()->json($chiTietSanPham,200);
        } else {
            return response()->json([
                'message' => 'Tạo chi tiết sản phẩm không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function capNhatChiTietSanPham(Request $request, $id)
    {
        $request->validate([
            'KichThuoc' => 'required',
            'Mau' => 'required',
            'MoTa' => 'required|string'
        ]);

        $sanPham = SanPham::find($request->MaSP);
        if (!$sanPham) {
            return response()->json([
                'message' => 'ID sản phẩm không tồn tại',
                'status' => 500
            ],500);
        }

        $chietTiet = ChiTietSanPham::where('KichThuoc', $request->KichThuoc)->where('Mau', $request->Mau)->first();
        if ($chietTiet) {
            return response()->json([
                'message' => 'Kích thước và màu này đã tồn tại',
                'status' => 500
            ],500);
        }

        $chiTietSanPham = ChiTietSanPham::find($id);
        $chiTietSanPham->KichThuoc = $request->KichThuoc;
        $chiTietSanPham->Mau = $request->Mau;
        $chiTietSanPham->MoTa = $request->MoTa;

        if ($chiTietSanPham->save()) {
            return response()->json($chiTietSanPham,200);
        } else {
            return response()->json([
                'message' => 'Cập chi tiết sản phẩm không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function deleteChiTietSanPham($id)
    {
        $chiTietSanPham = ChiTietSanPham::find($id);
        if ($chiTietSanPham->delete()) {
            return response()->json([
                'message' => 'Xóa chi tiết sản phẩm thành công',
                'status' => 200
            ],200);
        }

        return response()->json([
            'message' => 'Xóa chi tiết sản phẩm thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }

    // sản phẩm bộ sưu tập
    public function createSanPhamBoSuTap(Request $request)
    {
        try {
            $idSanPham = $request->idSanPham;
            $listCheckedId = $request->listCheckedId;
            $listId = explode(',',$listCheckedId);
            if ($listId[0] != "") {
                foreach ($listId as $val) {
                    $getSanPhamBST = SanPhamBoSuuTap::where('MaSP', $idSanPham)->where('MaBST', $val)->first();
                    if (!$getSanPhamBST) { // Nếu chưa tồn tại sản phẩm bộ sưu tập thì thêm
                        $sanPhamBoSuuTap = new SanPhamBoSuuTap();
                        $sanPhamBoSuuTap->MaSP = $idSanPham;
                        $sanPhamBoSuuTap->MaBST = $val;
                        $sanPhamBoSuuTap->save();
                    }
                }
            }

            // Xóa bộ sưu tập không được chọn
            $listBoSuuTap = SanPhamBoSuuTap::where('MaSP', $idSanPham)->select('MaBST')->get();
            $maBST = [];
            foreach ($listBoSuuTap as $val) {
                $maBST[] = $val->MaBST;
            }
            $diff = array_diff($maBST, $listId);
            foreach ($diff as $val) {
                $getSanPhamBST = SanPhamBoSuuTap::where('MaSP', $idSanPham)->where('MaBST', $val)->first();
                if ($getSanPhamBST) {
                    $getSanPhamBST->delete();
                }
            }

            return response()->json('Cập nhật thành công',200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function getBoSuuTapCuaSanPham($id)
    {
        try {
            $listBoSuuTap = SanPhamBoSuuTap::where('MaSP', $id)->select('MaBST')->get();
            $maBST = [];
            foreach ($listBoSuuTap as $val) {
                $maBST[] = $val->MaBST;
            }

            return response()->json($maBST,200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    // Orders
    public function getListOrders()
    {
        try {
            $orders = DB::table('hoa_don')
                        ->join('delivery_addresses', 'delivery_addresses.order_id', 'hoa_don.id')
                        ->join('chi_tiet_hoa_don', 'chi_tiet_hoa_don.MaHoaDon', 'hoa_don.id')
                        ->select('chi_tiet_hoa_don.MaHoaDon', 'hoa_don.TrangThai', 'delivery_addresses.name', 'delivery_addresses.phone', 'delivery_addresses.address', 'delivery_addresses.district', 'delivery_addresses.city', DB::raw('SUM(chi_tiet_hoa_don.Gia) as TongGia'), DB::raw("(DATE_FORMAT(hoa_don.created_at,'%d-%m-%Y')) as NgayTao"))
                        ->groupBy('MaHoaDon')
                        ->get();
            return response()->json($orders, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

// API của khách hàng
    public function danhSachSanPham(Request $request)
    {
        try {
            $danhSachSanPham = DB::table('san_pham')
                            ->select('san_pham.*', 'loai_san_pham.Ten as TenLoaiSanPham')
                            ->join('loai_san_pham', 'loai_san_pham.id', '=', 'san_pham.MaLoaiSanPham')
                            ->orderBy('rating', 'desc')
                            ->paginate(20);
            if ($request->has('search') && $request->get('search')) {
                $danhSachSanPham = DB::table('san_pham')->select('*')
                                ->select('san_pham.*', 'loai_san_pham.Ten as TenLoaiSanPham')
                                ->join('loai_san_pham', 'loai_san_pham.id', '=', 'san_pham.MaLoaiSanPham')
                                ->where('san_pham.TenSP', 'like', "%{$request->search}%")
                                ->orWhere('loai_san_pham.Ten', 'like', "%{$request->search}%")
                                ->orderBy('rating', 'desc')
                                ->paginate(20);
            }
            if ($request->has('MaLoaiSanPham') && $request->get('MaLoaiSanPham')) {
                $danhSachSanPham = DB::table('san_pham')->select('*')
                                ->select('san_pham.*', 'loai_san_pham.Ten as TenLoaiSanPham')
                                ->join('loai_san_pham', 'loai_san_pham.id', '=', 'san_pham.MaLoaiSanPham')
                                ->where('san_pham.MaLoaiSanPham', $request->MaLoaiSanPham)
                                ->orderBy('rating', 'desc')
                                ->paginate(20);
            }
            return response()->json($danhSachSanPham,200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function chiTietSanPham(Request $request)
    {
        try {
            $id = $request->id;
            $chiTietSanPham = SanPham::with('chiTietSanPham')->with('sanPhamBoSuuTap')->findOrFail($id);
            return response()->json($chiTietSanPham,200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function order(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'user_id' => 'required',
                'name' => 'required|string',
                'phone' => 'required|numeric',
                'address' => 'required|string',
                'district' => 'required|string',
                'city' => 'required|string',
                'carts' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors(),
                    'status' => 401
                ],401);
            }

            $carts = json_decode($request->carts);
            if ($carts) {
                $order = new HoaDon();
                $order->MaKhachHang = $request->user_id;

                if ($order->save()) {
                    $order_id = DB::getPdo()->lastinsertID();
                    if ($order_id) {
                        $shippingDetails = new DeliveryAddress();
                        $shippingDetails->order_id      = $order_id;
                        $shippingDetails->name          = $request->name;
                        $shippingDetails->phone         = $request->phone;
                        $shippingDetails->address       = $request->address;
                        $shippingDetails->district      = $request->district;
                        $shippingDetails->city          = $request->city;
                        $shippingDetails->save();

                        foreach ($carts as $val) {
                            $chiTietHoaDon = new ChiTietHoaDon();
                            $chiTietHoaDon->MaChiTietSP = $val->MaChiTietSP;
                            $chiTietHoaDon->MaHoaDon    = $order_id;
                            $chiTietHoaDon->SoLuong     = $val->SoLuong;
                            $chiTietHoaDon->Gia         = $val->Gia;
                            $chiTietHoaDon->save();
                        }
                        return response()->json([
                            'message' => 'Đặt hàng thành công',
                            'status' => 200
                        ],200);
                    }
                }
            } else {
                return response()->json([
                    'message' => 'Chưa có sản phẩm trong giỏ hàng!',
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

    public function listOrders(Request $request)
    {
        try {
            $orders = HoaDon::with(['khachHang' => function ($query) {
                                        $query->select('users.id', 'users.HoTen');
                                    }])
                            ->with('deliveryAddress')
                            ->with(['chiTietHoaDon' => function ($query) {
                                $query->join('chi_tiet_san_pham', 'chi_tiet_san_pham.id', '=', 'chi_tiet_hoa_don.MaChiTietSP')
                                    ->join('san_pham', 'san_pham.id', '=', 'chi_tiet_san_pham.MaSP')
                                    ->select('chi_tiet_hoa_don.MaChiTietSP', 'chi_tiet_hoa_don.MaHoaDon', 'chi_tiet_hoa_don.SoLuong', 'chi_tiet_hoa_don.Gia', 'chi_tiet_san_pham.KichThuoc', 'chi_tiet_san_pham.Mau', 'chi_tiet_san_pham.MoTa', 'san_pham.TenSP', 'san_pham.AnhChinh');
                            }])
                            ->select('hoa_don.id', 'hoa_don.MaKhachHang', 'hoa_don.TrangThai', DB::raw("(to_char(hoa_don.created_at,'dd-mm-yyyy')) as NgayTao"))
                            ->orderBy('hoa_don.created_at', 'desc')
                            ->get();
            if ($request->has('id') && $request->get('id')) {
                $orders = HoaDon::with(['khachHang' => function ($query) {
                                $query->select('users.id', 'users.HoTen');
                            }])
                            ->with('deliveryAddress')
                            ->with(['chiTietHoaDon' => function ($query) {
                                $query->join('chi_tiet_san_pham', 'chi_tiet_san_pham.id', '=', 'chi_tiet_hoa_don.MaChiTietSP')
                                    ->join('san_pham', 'san_pham.id', '=', 'chi_tiet_san_pham.MaSP')
                                    ->select('chi_tiet_hoa_don.*', 'chi_tiet_hoa_don.SoLuong', 'chi_tiet_hoa_don.Gia', 'chi_tiet_san_pham.KichThuoc', 'chi_tiet_san_pham.Mau', 'chi_tiet_san_pham.MoTa', 'san_pham.TenSP', 'san_pham.AnhChinh');
                            }])
                            ->where('hoa_don.id', $request->id)
                            ->select('hoa_don.id', 'hoa_don.MaKhachHang', 'hoa_don.TrangThai', DB::raw("(to_char(hoa_don.created_at,'dd-mm-yyyy')) as NgayTao"))
                            ->orderBy('hoa_don.created_at', 'desc')
                            ->get();
            } else if ($request->has('MaKhachHang') && $request->get('MaKhachHang')) {
                $orders = HoaDon::with(['khachHang' => function ($query) {
                                $query->select('users.id', 'users.HoTen');
                            }])
                            ->with('deliveryAddress')
                            ->with(['chiTietHoaDon' => function ($query) {
                                $query->join('chi_tiet_san_pham', 'chi_tiet_san_pham.id', '=', 'chi_tiet_hoa_don.MaChiTietSP')
                                    ->join('san_pham', 'san_pham.id', '=', 'chi_tiet_san_pham.MaSP')
                                    ->select('chi_tiet_hoa_don.*', 'chi_tiet_hoa_don.SoLuong', 'chi_tiet_hoa_don.Gia', 'chi_tiet_san_pham.KichThuoc', 'chi_tiet_san_pham.Mau', 'chi_tiet_san_pham.MoTa', 'san_pham.TenSP', 'san_pham.AnhChinh');
                            }])
                            ->where('hoa_don.MaKhachHang', $request->MaKhachHang)
                            ->select('hoa_don.id', 'hoa_don.MaKhachHang', 'hoa_don.TrangThai', DB::raw("(to_char(hoa_don.created_at,'dd-mm-yyyy')) as NgayTao"))
                            ->orderBy('hoa_don.created_at', 'desc')
                            ->get();
            } else if ($request->has('TrangThai') && $request->get('TrangThai')) {
                $orders = HoaDon::with(['khachHang' => function ($query) {
                                $query->select('users.id', 'users.HoTen');
                            }])
                            ->with('deliveryAddress')
                            ->with(['chiTietHoaDon' => function ($query) {
                                $query->join('chi_tiet_san_pham', 'chi_tiet_san_pham.id', '=', 'chi_tiet_hoa_don.MaChiTietSP')
                                    ->join('san_pham', 'san_pham.id', '=', 'chi_tiet_san_pham.MaSP')
                                    ->select('chi_tiet_hoa_don.*', 'chi_tiet_hoa_don.SoLuong', 'chi_tiet_hoa_don.Gia', 'chi_tiet_san_pham.KichThuoc', 'chi_tiet_san_pham.Mau', 'chi_tiet_san_pham.MoTa', 'san_pham.TenSP', 'san_pham.AnhChinh');
                            }])
                            ->where('hoa_don.TrangThai', $request->TrangThai)
                            ->select('hoa_don.id', 'hoa_don.MaKhachHang', 'hoa_don.TrangThai', DB::raw("(to_char(hoa_don.created_at,'dd-mm-yyyy')) as NgayTao"))
                            ->orderBy('hoa_don.created_at', 'desc')
                            ->get();
            }
            return response()->json($orders,200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function updateStatusOrder(Request $request)
    {
        try {
            $order = HoaDon::find($request->id);
            $order->TrangThai = $request->TrangThai;

            if ($order->update()) {
                return response()->json([
                    'message' => 'Cập nhật thành công',
                    'status' => 200
                ],200);
            }

            return response()->json([
                'message' => 'Cập nhật thất bại',
                'status' => 500
            ],500);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }

    public function deleteOrder($id)
    {
        $hoaDon = HoaDon::find($id);
        if ($hoaDon->delete()) {
            $chiTietHoaDon = ChiTietHoaDon::where('MaHoaDon', $id)->delete();
            $deliveryAddress = DeliveryAddress::where('order_id', $id)->delete();
            return response()->json([
                'message' => 'Xóa hóa đơn thành công',
                'status' => 200
            ],200);
        }

        return response()->json([
            'message' => 'Xóa hóa đơn thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }
}
