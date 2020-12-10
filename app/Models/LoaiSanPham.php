<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoaiSanPham extends Model
{
    protected $table = 'loai_san_pham';

    protected $fillable = ['HinhAnh', 'MoTa', 'Ten'];

    public function sanPham(){
        return $this->hasMany(SanPham::class, 'MaLoaiSanPham');
    }
}
