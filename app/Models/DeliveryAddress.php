<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryAddress extends Model
{
    protected $table = 'delivery_addresses';

    public function hoaDon(){
        return $this->belongsTo(User::class, 'order_id');
    }
}
