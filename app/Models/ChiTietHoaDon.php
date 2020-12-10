<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChiTietHoaDon extends Model
{
    protected $table = 'chi_tiet_hoa_don';

    protected $fillable = ['MaChiTietSP', 'MaHoaDon', 'SoLuong', 'Gia'];

    public function hoaDon(){
        return $this->belongsTo(HoaDon::class, 'MaHoaDon');
    }

    public function chiTietSanPham(){
        return $this->belongsTo(ChiTietSanPham::class, 'MaChiTietSP');
    }
}
