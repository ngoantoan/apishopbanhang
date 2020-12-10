<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use App\Models\LoaiSanPham;

class LoaiSanPhamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listLoaiSanPham = LoaiSanPham::get();
        return response()->json($listLoaiSanPham,200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'Ten' => 'required|string|max:255',
            'HinhAnh' => 'required|image|mimes:jpeg,png,jpg',
            'MoTa' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => $validator->errors(),
                'status' => 401
            ],401);
        }

        $loaiSanPham = new LoaiSanPham();

        $loaiSanPham->Ten = $request->Ten;
        $loaiSanPham->MoTa = $request->MoTa;

        $path = $request->file('HinhAnh')->store('loai-san-pham');
        $loaiSanPham->HinhAnh = $path;

        if ($loaiSanPham->save()) {
            return response()->json($loaiSanPham,200);
        } else {
            return response()->json([
                'message' => 'Tạo loại sản phẩm không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'Ten' => 'required|string|max:255',
            'MoTa' => 'required|string',
        ]);

        $loaiSanPham = LoaiSanPham::find($id);

        $loaiSanPham->Ten = $request->Ten;
        $loaiSanPham->MoTa = $request->MoTa;

        $oldPath = $loaiSanPham->HinhAnh;

        if ($request->hasFile('HinhAnh')) {
            $request->validate([
                'HinhAnh' => 'required|image|mimes:jpeg,png,jpg',
            ]);

            $path = $request->file('HinhAnh')->store('loai-san-pham');
            $loaiSanPham->HinhAnh = $path;

            Storage::delete($oldPath);
        }

        if ($loaiSanPham->save()) {
            return response()->json($loaiSanPham,200);
        } else {
            Storage::delete($path);
            return response()->json([
                'message' => 'Cập nhật loại sản phẩm không thành công!',
                'status' => 500
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $loaiSanPham = LoaiSanPham::find($id);
        if ($loaiSanPham->delete()) {
            return response()->json([
                'message' => 'Xóa danh mục sản phẩm thành công',
                'status_code' => 200
            ],200);
        }  else {
            return response()->json([
                'message' => 'Xóa danh mục sản phẩm không thành công',
                'status_code' => 500
            ],500);
        }
    }
}
