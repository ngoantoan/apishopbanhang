<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\BoSuuTap;

class BoSuuTapController extends Controller
{
// API Admin
    public function index()
    {
        $listBoSuuTap = BoSuuTap::get();
        return response()->json($listBoSuuTap,200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'TenBST' => 'required|max:255|unique:bo_suu_tap,TenBST',
            'MoTa' => 'required|string',
            'AnhChinh' => 'required|string',
        ],[
            'TenBST.required'   => 'Tên bộ sưu tập không được trống',
            'TenBST.max'        => 'Tên bộ sư tập không quá 255 ký tự',
            'TenBST.unique'     => 'Tên bộ sưu tập đã tồn tại',
            'MoTa.required'     => 'Mô tả không được trống',
            'MoTa.string'       => 'Mô tả phải là chuỗi',
            'AnhChinh.required'     => 'Mô tả không được trống',
            'AnhChinh.string'       => 'Mô tả phải là chuỗi',
        ]);

        $boSuuTap = new BoSuuTap();
        $boSuuTap->TenBST = $request->TenBST;
        $boSuuTap->MoTa = $request->MoTa;
        $boSuuTap->AnhChinh = $request->AnhChinh;

        if ($boSuuTap->save()) {
            return response()->json($boSuuTap,200);
        } else {
            return response()->json([
                'message' => 'Thêm bộ sưu tập không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'TenBST' => 'required|string|max:255',
            'MoTa' => 'required|string',
            'AnhChinh' => 'required|string'
        ],[
            'TenBST.required'   => 'Tên bộ sưu tập không được trống',
            'TenBST.max'        => 'Tên bộ sư tập không quá 255 ký tự',
            'TenBST.unique'     => 'Tên bộ sưu tập đã tồn tại',
            'MoTa.required'     => 'Mô tả không được trống',
            'MoTa.string'       => 'Mô tả phải là chuỗi',
            'AnhChinh.required'     => 'Mô tả không được trống',
            'AnhChinh.string'       => 'Mô tả phải là chuỗi'
        ]);

        $boSuuTap = BoSuuTap::find($id);

        $boSuuTap->TenBST = $request->TenBST;
        $boSuuTap->MoTa = $request->MoTa;
        $boSuuTap->AnhChinh = $request->AnhChinh;

        if ($boSuuTap->update()) {
            return response()->json($boSuuTap,200);
        }

        return response()->json([
            'message' => 'Cập nhật bộ sưu tập thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }

    public function destroy($id)
    {
        $boSuuTap = BoSuuTap::find($id);
        if ($boSuuTap) {
            if ($boSuuTap->delete()) {
                return response()->json([
                    'message' => 'Xóa bộ sưu tập thành công',
                    'status' => 200
                ],200);
            }
        }

        return response()->json([
            'message' => 'Xóa bộ sưu tập thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }

// API khách hàng
}
