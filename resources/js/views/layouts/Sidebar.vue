<template>
    <div class="bg-gradient-primary">
        <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>
            <hr class="sidebar-divider my-0">

            <li class="nav-item active">
                <router-link to="/admin" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>

            <li class="nav-item" v-if="$store.state.profile.LoaiTaiKhoan == 1">
                <router-link to="/admin/loai-san-pham" class="nav-link">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Loại sản phẩm</span>
                </router-link>
            </li>

            <li class="nav-item" v-if="$store.state.profile.LoaiTaiKhoan == 1">
                <router-link to="/admin/san-pham" class="nav-link">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Sản phẩm</span>
                </router-link>
            </li>

            <li class="nav-item" v-if="$store.state.profile.LoaiTaiKhoan == 1">
                <router-link to="/admin/bo-suu-tap" class="nav-link">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Bộ sưu tập</span>
                </router-link>
            </li>

            <li class="nav-item" v-if="$store.state.profile.LoaiTaiKhoan == 1">
                <router-link to="/admin/slider" class="nav-link">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Slider</span>
                </router-link>
            </li>

            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Quản lý tài khoản</span>
                </a>
                <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <router-link to="/admin/users" class="collapse-item" v-if="$store.state.profile.LoaiTaiKhoan == 1">Nhân viên</router-link>
                        <router-link to="/admin/customers" class="collapse-item">Khách hàng</router-link>
                    </div>
                </div>
            </li>

            <!--li class="nav-item">
                <router-link to="/admin/don-hang" class="nav-link">
                    <i class="fas fa-fw fa-table"></i>
                    <span>Quản lý đơn hàng</span>
                </router-link>
            </li-->

            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    </div>
</template>

<script>
export default {

}
</script>
