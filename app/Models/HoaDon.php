<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    protected $table = 'hoa_don';

    protected $fillable = ['MaKhachHang'];

    public function trangThaiHoaDon(){
        return $this->hasMany(TrangThaiHoaDon::class, 'MaHoaDon');
    }

    public function chiTietHoaDon(){
        return $this->hasMany(ChiTietHoaDon::class, 'MaHoaDon');
    }

    public function deliveryAddress(){
        return $this->hasOne(DeliveryAddress::class, 'order_id');
    }

    public function khachHang(){
        return $this->belongsTo(User::class, 'MaKhachHang');
    }
}
