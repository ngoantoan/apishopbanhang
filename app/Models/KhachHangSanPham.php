<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KhachHangSanPham extends Model
{
    protected $table = 'khach_hang_san_pham';

    protected $fillable = ['MaKhachHang', 'MaSanPham', 'YeuThich'];

    public function khachHang(){
        return $this->belongsTo(User::class, 'MaKhachHang');
    }

    public function sanPham(){
        return $this->belongsTo(SanPham::class, 'MaSanPham');
    }
}
