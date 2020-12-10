<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHinhanhToBoSuuTapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bo_suu_tap', function (Blueprint $table) {
            $table->text('MoTa')->nullable()->default(null);
            $table->string('AnhChinh')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bo_suu_tap', function (Blueprint $table) {
            $table->dropColumn('MoTa');
            $table->dropColumn('AnhChinh');
        });
    }
}
