<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GioHang extends Model
{
    protected $table = 'gio_hang';

    protected $fillable = ['MaChiTietSanPham', 'MaKhachHang', 'SoLuong'];

    public function chiTietSanPham(){
        return $this->belongsTo(ChiTietSanPham::class, 'MaChiTietSanPham');
    }

    public function khachHang(){
        return $this->belongsTo(User::class, 'MaKhachHang');
    }
}
