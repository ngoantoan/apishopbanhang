<?php

use Illuminate\Support\Facades\Route;

Route::group(['namespace' => 'Admin'], function () {

    Route::match(['get', 'post'], '/admin', 'AuthController@login');

    Route::group(['prefix' => 'admin', 'middleware' => 'adminAuth'], function () {
        Route::get('logout','AuthController@logout');

        Route::get('dashboard','DashboardController@dashboard');

        // Loại sản phẩm
        Route::resource('loai-san-pham', 'LoaiSanPhamController');
    });
});

Route::get('/{any}', function () {
    return view('app');
})->where('any','.*');
