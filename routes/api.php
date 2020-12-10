<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['namespace' => 'API'], function () {

    // Users
    Route::group(['prefix' => 'user'], function () {

        Route::get('danh-sach-user','UserController@getUser');
        Route::post('dang-ky','UserController@dangKy');
        Route::post('dang-nhap','UserController@dangNhap');

        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('dang-xuat','UserController@dangXuat');
        });
    });

    Route::group(['middleware' => 'auth:api'], function () {

        // Loại sản phẩm
        Route::get('danh-sach-loai-san-pham','LoaiSanPhamController@index');
        Route::post('them-loai-san-pham','LoaiSanPhamController@store');
        Route::post('cap-nhat-loai-san-pham/{id}','LoaiSanPhamController@update');
        Route::delete('xoa-loai-san-pham/{id}','LoaiSanPhamController@destroy');

        // Sản phẩm
        Route::get('danh-sach-san-pham','SanPhamController@index');
        Route::post('them-san-pham','SanPhamController@store');
        Route::post('cap-nhat-san-pham/{id}','SanPhamController@update');
        Route::delete('xoa-san-pham/{id}','SanPhamController@destroy');

        // Bộ sưu tập
        Route::get('danh-sach-bo-suu-tap','BoSuuTapController@index');
        Route::post('them-bo-suu-tap','BoSuuTapController@store');
        Route::post('cap-nhat-bo-suu-tap/{id}','BoSuuTapController@update');
        Route::delete('xoa-bo-suu-tap/{id}','BoSuuTapController@destroy');
    });

    // Khách hàng
    Route::group(['prefix' => 'customer'], function () {

        Route::post('dang-ky','CustomerController@dangKy');
        Route::post('dang-nhap','CustomerController@dangNhap');

        // Danh sách sản phẩm
        Route::get('danh-sach-san-pham', 'SanPhamController@danhSachSanPham');

        // chi tiết ản phẩm
        Route::get('chi-tiet-san-pham', 'SanPhamController@chiTietSanPham');

        // Dashboard khách hàng
        Route::get('dashboard', 'DashboardController@dashboard');

        // Thống kê doanh thu
        Route::get('get-quarterly-statistics', 'DashboardController@quarterlyStatistics');
        Route::get('get-category-statistics', 'DashboardController@categorytStatistics');


        // Giỏ hàng
        Route::post('them-gio-hang', 'GioHangController@themGioHang');
        Route::post('xoa-gio-hang', 'GioHangController@xoaGioHang');
        Route::post('cap-nhat-gio-hang', 'GioHangController@capNhatGioHang');
        Route::get('danh-sach-gio-hang', 'GioHangController@danhSachGioHang');

        Route::group(['middleware' => 'auth:api'], function () {

            Route::get('dang-xuat','CustomerController@dangXuat');

            // cập nhật thông tin khách hàng
            Route::post('cap-nhat-thong-tin-khach-hang/{id}', 'CustomerController@updateProfileCustomer');

            // Đặt hàng
            Route::post('order', 'SanPhamController@order');
            Route::get('list-orders', 'SanPhamController@listOrders');
            Route::post('update-status-order', 'SanPhamController@updateStatusOrder');
            Route::post('delete-order/{id}', 'SanPhamController@deleteOrder');
        });
    });
});

// Admin
Route::group(['namespace' => 'API'], function () {

    Route::group(['prefix' => 'admin'], function () {

        Route::post('login','UserController@dangNhap');
        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('logout','UserController@dangXuat');
            Route::get('profile','UserController@profile');

            // Loại sản phẩm
            Route::resource('loai-san-pham', 'LoaiSanPhamController');

            // Sản phẩm
            Route::resource('san-pham', 'SanPhamController');
            Route::get('danh-sach-chi-tiet-san-pham/{id}', 'SanPhamController@danhSachChiTietSanPham');
            Route::post('them-chi-tiet-san-pham', 'SanPhamController@themChiTietSanPham');
            Route::post('cap-nhat-chi-tiet-san-pham/{id}', 'SanPhamController@capNhatChiTietSanPham');
            Route::delete('xoa-chi-tiet-san-pham/{id}', 'SanPhamController@deleteChiTietSanPham');

            // Bộ sưu tập
            Route::resource('bo-su-tap', 'BoSuuTapController');
            Route::post('them-san-pham-bo-su-tap', 'SanPhamController@createSanPhamBoSuTap');
            Route::get('bo-suu-tap-cua-san-pham/{id}', 'SanPhamController@getBoSuuTapCuaSanPham');

            // Slider
            Route::resource('slider', 'SliderController');

            // Quản lý tài khoản
            Route::resource('users', 'UserController');
            Route::get('danh-sach-khach-hang', 'UserController@getKhachHang');
            Route::get('danh-sach-nhan-vien', 'UserController@getNhanVien');

            // Thống kê doanh thu
            Route::get('get-quarterly-statistics', 'DashboardController@quarterlyStatistics');
            Route::get('get-category-statistics', 'DashboardController@categorytStatistics');

            // Orders
            Route::get('get-list-orders', 'SanPhamController@getListOrders');
        });
    });

});

