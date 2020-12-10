<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SanPham extends Model
{
    protected $table = 'san_pham';

    protected $fillable = ['AnhChinh', 'DongGia', 'MaLoaiSanPham', 'TenSP'];

    public function khachHangSanPham(){
        return $this->hasMany(KhachHangSanPham::class, 'MaSanPham');
    }

    public function sanPhamBoSuuTap(){
        return $this->belongsToMany(BoSuuTap::class, 'san_pham_bo_suu_tap', 'MaSP', 'MaBST');
    }

    public function loaiSanPham(){
        return $this->belongsTo(LoaiSanPham::class, 'MaLoaiSanPham');
    }

    public function chiTietSanPham(){
        return $this->hasMany(ChiTietSanPham::class, 'MaSP');
    }
}
