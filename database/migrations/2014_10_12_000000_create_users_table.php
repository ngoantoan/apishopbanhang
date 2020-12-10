<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('TenDangNhap');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->tinyInteger('LoaiTaiKhoan')->default(3);
            $table->string('HoTen')->nullable()->default(null);
            $table->date('NgaySinh')->nullable()->default(null);
            $table->string('SDT')->nullable()->default(null);
            $table->string('GioiTinh')->nullable()->default(null);
            $table->string('HinhAnh')->nullable()->default(null);
            $table->string('DiaChi_ThanhPho')->nullable()->default(null);
            $table->string('DiaChi_Quan')->nullable()->default(null);
            $table->string('DiaChi_SoNha')->nullable()->default(null);
            $table->string('CapVIP')->nullable()->default(null);
            $table->boolean('TrangThai')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
