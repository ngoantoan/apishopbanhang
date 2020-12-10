<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrangThaiHoaDon extends Model
{
    protected $table = 'trang_thai_hoa_don';

    protected $fillable = ['MaHoaDon', 'MaNhanVien', 'MoTa', 'TrangThai'];

    public function hoaDon(){
        return $this->belongsTo(HoaDon::class, 'MaHoaDon');
    }

    public function nhanVien(){
        return $this->belongsTo(User::class, 'MaNhanVien');
    }
}
