import Vue from 'vue';
import VueRouter from 'vue-router';
import * as auth from './services/auth_service';
import store from './store';

Vue.use(VueRouter)

const routes = [
    {
        path: '/admin',
        name: 'Admin',
        component: () =>
            import ('./views/Admin.vue'),
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () =>
                    import ('./views/Dashboard.vue'),
            },{
                path: 'loai-san-pham',
                name: 'LoaiSanPham',
                component: () => import('./views/loai_san_pham/LoaiSanPham.vue'),
                beforeEnter: (to, from, next) => {
                    if (store.state.profile.LoaiTaiKhoan != 1) {
                        next('/');
                    } else {
                        next();
                    }
                }
            },{
                path: 'san-pham',
                name: 'SanPham',
                component: () => import('./views/san_pham/SanPham.vue'),
                beforeEnter: (to, from, next) => {
                    if (store.state.profile.LoaiTaiKhoan != 1) {
                        next('/');
                    } else {
                        next();
                    }
                }
            },{
                path: 'danh-sach-chi-tiet-san-pham/:id',
                name: 'DanhSachChiTietSanPham',
                component: () => import('./views/san_pham/ChiTietSanPham.vue'),
                beforeEnter: (to, from, next) => {
                    if (store.state.profile.LoaiTaiKhoan != 1) {
                        next('/');
                    } else {
                        next();
                    }
                }
            },{
                path: 'bo-suu-tap',
                name: 'BoSuTap',
                component: () => import('./views/bo_su_tap/BoSuTap.vue'),
                beforeEnter: (to, from, next) => {
                    if (store.state.profile.LoaiTaiKhoan != 1) {
                        next('/');
                    } else {
                        next();
                    }
                }
            },{
                path: 'slider',
                name: 'Slider',
                component: () => import('./views/slider/Slider.vue'),
                beforeEnter: (to, from, next) => {
                    if (store.state.profile.LoaiTaiKhoan != 1) {
                        next('/');
                    } else {
                        next();
                    }
                }
            },{
                path: 'users',
                name: 'Users',
                component: () => import('./views/users/Users.vue')
            },{
                path: 'customers',
                name: 'Customers',
                component: () => import('./views/users/Customers')
            },{
                path: 'don-hang',
                name: 'DonHang',
                component: () => import('./views/orders/Order')
            },{
                path: 'chi-tiet-don-hang',
                name: 'ChiTietDonHang',
                component: () => import('./views/orders/Order')
            }
        ],
        beforeEnter: (to, from, next) => {
            if (!auth.isLoggedIn()) {
                next('/');
            } else {
                next();
            }
        }
    },{
        path: '/',
        name: 'Login',
        component: () =>
            import ('./views/authentication/Login.vue'),
        beforeEnter: (to, from, next) => {
            if (!auth.isLoggedIn()) {
                next();
            } else {
                next('/admin');
            }
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router;
