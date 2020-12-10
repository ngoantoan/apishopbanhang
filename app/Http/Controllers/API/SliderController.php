<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slider;

class SliderController extends Controller
{
// API Admin
    public function index()
    {
        $listSlider = Slider::get();
        return response()->json($listSlider,200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'TenBST' => 'required|string|unique:slider,TenBST|max:255',
            'MoTa' => 'required|string',
            'Anh' => 'required|string',
        ]);

        $slider = new Slider();

        $slider->TenBST = $request->TenBST;
        $slider->MoTa = $request->MoTa;
        $slider->Anh = $request->Anh;

        if ($slider->save()) {
            return response()->json($slider,200);
        } else {
            return response()->json([
                'message' => 'Tạo slider không thành công, xin vui lòng thử lại',
                'status' => 500
            ],500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'TenBST' => 'required|string',
            'MoTa' => 'required|string',
            'Anh' => 'required|string',
        ]);

        $slider = Slider::find($id);

        $slider->TenBST = $request->TenBST;
        $slider->MoTa = $request->MoTa;
        $slider->Anh = $request->Anh;

        if ($slider->update()) {
            return response()->json($slider,200);
        } else {
            // unlink($imageName);
            return response()->json([
                'message' => 'Cập nhật slider không thất bại!',
                'status' => 500
            ],500);
        }
    }

    public function destroy($id)
    {
        $slider = Slider::find($id);
        if ($slider->delete()) {
            return response()->json([
                'message' => 'Xóa slider thành công',
                'status' => 200
            ],200);
        }

        return response()->json([
            'message' => 'Xóa slider thất bại, xin vui lòng thử lại!',
            'status' => 500
        ],500);
    }

// API của khách hàng
    public function listSlider()
    {
        try {
            $sliders = Slider::get();
            return response()->json([
                'slider' => $sliders,
                'status' => 200
            ],200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'status' => 500
            ],500);
        }
    }
}
