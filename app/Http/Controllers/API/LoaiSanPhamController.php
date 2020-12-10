<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\LoaiSanPham;
use App\Models\SanPham;

class LoaiSanPhamController extends Controller
{
// API Admin
    public function index()
    {
        $listLoaiSanPham = LoaiSanPham::get();
        return response()->json($listLoaiSanPham,200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'Ten' => 'required|string|max:255',
            // 'HinhAnh' => 'required|image|mimes:jpeg,png,jpg',
            'HinhAnh' => 'required|string',
            'MoTa' => 'required|string',
        ]);

        $loaiSanPham = new LoaiSanPham();

        $loaiSanPham->Ten = $request->Ten;
        $loaiSanPham->MoTa = $request->MoTa;

        // $imageName = time().'.'.$request->HinhAnh->extension();
        // $request->HinhAnh->move(public_path('images/loai-san-pham'), $imageName);

        // $loaiSanPham->HinhAnh = 'images/loai-san-pham/' . $imageName;
        $loaiSanPham->HinhAnh = $request->HinhAnh;

        if ($loaiSanPham->save()) {
            return response()->json($loaiSanPham,200);
        } else {
            return response()->json([
                'message' => 'Tạo loại sản phẩm không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'Ten' => 'required|string|max:255',
            'MoTa' => 'required|string',
        ]);

        $loaiSanPham = LoaiSanPham::find($id);

        $loaiSanPham->Ten = $request->Ten;
        $loaiSanPham->MoTa = $request->MoTa;

        // $oldPath = $loaiSanPham->HinhAnh;

        // if ($request->hasFile('HinhAnh')) {
        //     $request->validate([
        //         'HinhAnh' => 'required|image|mimes:jpeg,png,jpg',
        //     ]);

        //     $imageName = time().'.'.$request->HinhAnh->extension();
        //     $request->HinhAnh->move(public_path('images/loai-san-pham'), $imageName);

        //     $loaiSanPham->HinhAnh = 'images/loai-san-pham/' . $imageName;

        //     unlink($oldPath);
        // }

        $loaiSanPham->HinhAnh = $request->HinhAnh;

        if ($loaiSanPham->update()) {
            return response()->json($loaiSanPham,200);
        } else {
            // unlink('images/loai-san-pham/' . $imageName);
            return response()->json([
                'message' => 'Cập nhật loại sản phẩm không thành công!',
                'status' => 500
            ],500);
        }
    }

    public function destroy($id)
    {
        $loaiSanPham = LoaiSanPham::find($id);
        if ($loaiSanPham) {
            $sanPham = SanPham::where('MaLoaiSanPham', $id)->first();
            if ($sanPham) {
                return response()->json([
                    'message' => 'Vui lòng xóa sản phẩm của loại sản phẩm này trước',
                    'status' => 500
                ],500);
            }
            if ($loaiSanPham->delete()) {
                // unlink($loaiSanPham->HinhAnh);
                return response()->json([
                    'message' => 'Xóa loại sản phẩm thành công',
                    'status' => 200
                ],200);
            }
        }

        return response()->json([
            'message' => 'Xóa loại sản phẩm thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }
}
