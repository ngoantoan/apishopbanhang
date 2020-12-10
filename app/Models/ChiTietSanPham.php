<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChiTietSanPham extends Model
{
    protected $table = 'chi_tiet_san_pham';

    protected $fillable = ['KichThuoc', 'MaSP', 'Mau', 'MoTa'];

    public function chiTietHoaDon(){
        return $this->hasMany(ChiTietHoaDon::class, 'MaChiTietSP');
    }

    public function gioHang(){
        return $this->hasMany(GioHang::class, 'MaChiTietSanPham');
    }

    public function sanPham(){
        return $this->belongsTo(SanPham::class, 'MaSP');
    }
}
