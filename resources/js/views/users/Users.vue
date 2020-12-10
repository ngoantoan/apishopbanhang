<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý tài khoản nhân viên</h6>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewUserModal"><span class="fa fa-plus"></span> Thêm tài khoản</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Họ tên</th>
                                <th>Tên đăng nhập</th>
                                <th>Số điện thoại</th>
                                <th>Loại tài khoản</th>
                                <th>Ảnh</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user,index) in users" :key="index" v-if="user.LoaiTaiKhoan != 1 || $store.state.profile.LoaiTaiKhoan == 1">
                                <td>{{index+1}}</td>
                                <td>{{user.HoTen}}</td>
                                <td>{{user.TenDangNhap}}</td>
                                <td>{{user.SDT}}</td>
                                <td v-if="user.LoaiTaiKhoan == 1">Admin</td>
                                <td v-else-if="user.LoaiTaiKhoan == 2">Nhân viên</td>
                                <td v-else="user.LoaiTaiKhoan == 3">Khách hàng</td>
                                <td>
                                    <img :src="`${user.HinhAnh}`" width="50">
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-sm" v-on:click="editUser(user)"><span class="fa fa-edit"></span></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteUser(user)" v-if="$store.state.profile.id != user.id"><span class="fa fa-trash"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="newUserModal" hide-footer title="Thêm tài khoản">
            <form v-on:submit.prevent="createUser">
                <div class="form-group">
                    <label>Họ tên</label>
                    <input type="text" v-model="userData.HoTen" class="form-control" placeholder="Nhập họ tên">
                    <div class="invalid-feedback" v-if="errors.HoTen">{{errors.HoTen[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Tên đăng nhập</label>
                    <input type="text" v-model="userData.TenDangNhap" class="form-control" placeholder="Nhập tên tên đăng nhập">
                    <div class="invalid-feedback" v-if="errors.TenDangNhap">{{errors.TenDangNhap[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" v-model="userData.email" class="form-control" placeholder="Nhập email">
                    <div class="invalid-feedback" v-if="errors.email">{{errors.email[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" v-model="userData.password" class="form-control" placeholder="Nhập mật khẩu">
                    <div class="invalid-feedback" v-if="errors.password">{{errors.password[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" v-model="userData.re_password" class="form-control" placeholder="Nhập lại mật khẩu">
                    <div class="invalid-feedback" v-if="errors.re_password">{{errors.re_password[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Ngày sinh</label>
                    <input type="date" v-model="userData.NgaySinh" class="form-control" placeholder="Nhập ngày sinh">
                </div>
                <div class="form-group">
                    <label>Số điện thoại</label>
                    <input type="text" v-model="userData.SDT" class="form-control" placeholder="Nhập số điện thoại">
                    <div class="invalid-feedback" v-if="errors.SDT">{{errors.SDT[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Giới tính</label>
                    <div class="d-flex pl-4">
                        <div class="form-check pr-2">
                            <input class="form-check-input" type="radio" v-model="userData.GioiTinh" value="Nam">
                            <label class="form-check-label">Nam</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="userData.GioiTinh" value="Nữ">
                            <label class="form-check-label">Nữ</label>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label>Thành phố</label>
                    <input type="text" v-model="userData.DiaChi_ThanhPho" class="form-control" placeholder="Nhập thành phố">
                    <div class="invalid-feedback" v-if="errors.DiaChi_ThanhPho">{{errors.DiaChi_ThanhPho[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Quận</label>
                    <input type="text" v-model="userData.DiaChi_Quan" class="form-control" placeholder="Nhập dịa chỉ quận">
                    <div class="invalid-feedback" v-if="errors.DiaChi_Quan">{{errors.DiaChi_Quan[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Số nhà</label>
                    <input type="text" v-model="userData.DiaChi_SoNha" class="form-control" placeholder="Nhập dịa chỉ quận">
                    <div class="invalid-feedback" v-if="errors.DiaChi_SoNha">{{errors.DiaChi_SoNha[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Ảnh</label>
                    <input type="text" v-model="userData.HinhAnh" class="form-control" id="name" placeholder="Nhập link ảnh tài khoản">
                    <div class="invalid-feedback" v-if="errors.HinhAnh">{{errors.HinhAnh[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Loại tài khoản</label>
                    <div class="d-flex pl-4">
                        <div class="form-check pr-2" v-if="$store.state.profile.LoaiTaiKhoan == 1">
                            <input class="form-check-input" type="radio" v-model="userData.LoaiTaiKhoan" value="1">
                            <label class="form-check-label">Admin</label>
                        </div>
                        <div class="form-check pr-2">
                            <input class="form-check-input" type="radio" v-model="userData.LoaiTaiKhoan" value="2">
                            <label class="form-check-label">Nhân viên</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="userData.LoaiTaiKhoan" value="3">
                            <label class="form-check-label">Khác hàng</label>
                        </div>
                    </div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideNewUserModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="editUserModal" hide-footer title="Cập nhật tài khoản">
            <form v-on:submit.prevent="updateUser">
                <div class="form-group">
                    <label>Họ tên</label>
                    <input type="text" v-model="editUserData.HoTen" class="form-control" placeholder="Nhập họ tên">
                    <div class="invalid-feedback" v-if="errors.HoTen">{{errors.HoTen[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Tên đăng nhập</label>
                    <input type="text" v-model="editUserData.TenDangNhap" class="form-control" placeholder="Nhập tên tên đăng nhập">
                    <div class="invalid-feedback" v-if="errors.TenDangNhap">{{errors.TenDangNhap[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" v-model="editUserData.email" class="form-control" placeholder="Nhập email">
                    <div class="invalid-feedback" v-if="errors.email">{{errors.email[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Ngày sinh</label>
                    <input type="date" v-model="editUserData.NgaySinh" class="form-control" placeholder="Nhập ngày sinh">
                    <div class="invalid-feedback" v-if="errors.NgaySinh">{{errors.NgaySinh[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Số điện thoại</label>
                    <input type="text" v-model="editUserData.SDT" class="form-control" placeholder="Nhập số điện thoại">
                    <div class="invalid-feedback" v-if="errors.SDT">{{errors.SDT[0]}}</div>
                    <div class="invalid-feedback" v-if="errors.SDT">{{errors.SDT[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Giới tính</label>
                    <div class="d-flex pl-4">
                        <div class="form-check pr-2">
                            <input class="form-check-input" type="radio" v-model="editUserData.GioiTinh" value="Nam">
                            <label class="form-check-label">Nam</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="editUserData.GioiTinh" value="Nữ">
                            <label class="form-check-label">Nữ</label>
                        </div>
                    </div>
                    <div class="invalid-feedback" v-if="errors.GioiTinh">{{errors.GioiTinh[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Thành phố</label>
                    <input type="text" v-model="editUserData.DiaChi_ThanhPho" class="form-control" placeholder="Nhập thành phố">
                    <div class="invalid-feedback" v-if="errors.DiaChi_ThanhPho">{{errors.DiaChi_ThanhPho[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Quận</label>
                    <input type="text" v-model="editUserData.DiaChi_Quan" class="form-control" placeholder="Nhập dịa chỉ quận">
                    <div class="invalid-feedback" v-if="errors.DiaChi_Quan">{{errors.DiaChi_Quan[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Số nhà</label>
                    <input type="text" v-model="editUserData.DiaChi_SoNha" class="form-control" placeholder="Nhập dịa chỉ quận">
                    <div class="invalid-feedback" v-if="errors.DiaChi_SoNha">{{errors.DiaChi_SoNha[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Ảnh</label>
                    <input type="text" v-model="editUserData.HinhAnh" class="form-control" id="name" placeholder="Nhập link ảnh tài khoản">
                    <div class="invalid-feedback" v-if="errors.HinhAnh">{{errors.HinhAnh[0]}}</div>
                </div>
                <div class="form-group">
                    <label>Loại tài khoản</label>
                    <div class="d-flex pl-4">
                        <div class="form-check pr-2" v-if="$store.state.profile.LoaiTaiKhoan == 1">
                            <input class="form-check-input" type="radio" v-model="editUserData.LoaiTaiKhoan" value="1">
                            <label class="form-check-label">Admin</label>
                        </div>
                        <div class="form-check pr-2">
                            <input class="form-check-input" type="radio" v-model="editUserData.LoaiTaiKhoan" value="2">
                            <label class="form-check-label">Nhân viên</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="editUserData.LoaiTaiKhoan" value="3">
                            <label class="form-check-label">Khác hàng</label>
                        </div>
                    </div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideEditUserModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import * as userService from '../../services/users_service.js';

    export default {
        name: "Users",
        data() {
            return {
                users: {},
                userData: {
                    HoTen: '',
                    TenDangNhap: '',
                    email: '',
                    password: '',
                    re_password: '',
                    NgaySinh: '',
                    SDT: '',
                    GioiTinh: '',
                    DiaChi_ThanhPho: '',
                    DiaChi_Quan: '',
                    DiaChi_SoNha: '',
                    HinhAnh: '',
                    LoaiTaiKhoan: 3
                },
                editUserData: {},
                errors: {},
            }
        },
        mounted() {
            this.getListUsers();
        },
        methods: {
            getListUsers: async function()
            {
                try {
                    const response = await userService.getNhaVien();
                    this.users = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            showNewUserModal() {
                this.$refs['newUserModal'].show();
            },
            hideNewUserModal() {
                this.$refs['newUserModal'].hide();
            },
            createUser: async function() {
                try {
                    const formData = new FormData();
                    formData.append('HoTen',this.userData.HoTen);
                    formData.append('TenDangNhap',this.userData.TenDangNhap);
                    formData.append('email',this.userData.email);
                    formData.append('password',this.userData.password);
                    formData.append('re_password',this.userData.re_password);
                    formData.append('NgaySinh',this.userData.NgaySinh);
                    formData.append('SDT',this.userData.SDT);
                    formData.append('GioiTinh',this.userData.GioiTinh);
                    formData.append('DiaChi_ThanhPho',this.userData.DiaChi_ThanhPho);
                    formData.append('DiaChi_Quan',this.userData.DiaChi_Quan);
                    formData.append('DiaChi_SoNha',this.userData.DiaChi_SoNha);
                    formData.append('HinhAnh',this.userData.HinhAnh);
                    formData.append('LoaiTaiKhoan',this.userData.LoaiTaiKhoan);

                    const response = await userService.createUser(formData);
                    this.users.unshift(response.data);

                    this.hideNewUserModal();
                    this.errors = {};
                    this.userData = {
                        HoTen: '',
                        TenDangNhap: '',
                        email: '',
                        password: '',
                        NgaySinh: '',
                        SDT: '',
                        GioiTinh: '',
                        DiaChi_ThanhPho: '',
                        DiaChi_Quan: '',
                        DiaChi_SoNha: '',
                        HinhAnh: ''
                    };

                    swal("Thành công", "Thêm tài khoản thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm tài khoản thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            showEditUserModal() {
                this.$refs['editUserModal'].show();
            },
            hideEditUserModal() {
                this.$refs['editUserModal'].hide();
            },
            editUser(user) {
                this.editUserData = {...user};
                this.showEditUserModal();
            },
            updateUser: async function() {
                try {
                    const formData = new FormData();
                    formData.append('HoTen',this.editUserData.HoTen);
                    formData.append('TenDangNhap',this.editUserData.TenDangNhap);
                    formData.append('email',this.editUserData.email);
                    formData.append('NgaySinh',this.editUserData.NgaySinh);
                    formData.append('SDT',this.editUserData.SDT);
                    formData.append('GioiTinh',this.editUserData.GioiTinh);
                    formData.append('DiaChi_ThanhPho',this.editUserData.DiaChi_ThanhPho);
                    formData.append('DiaChi_Quan',this.editUserData.DiaChi_Quan);
                    formData.append('DiaChi_SoNha',this.editUserData.DiaChi_SoNha);
                    formData.append('HinhAnh',this.editUserData.HinhAnh);
                    formData.append('LoaiTaiKhoan',this.editUserData.LoaiTaiKhoan);
                    formData.append('_method','put');

                    const response = await userService.updateUser(this.editUserData.id, formData);

                    this.users.map(user => {
                        if (user.id == response.data.id) {
                            for (let key in response.data) {
                                user[key] = response.data[key];
                            }
                        }
                    });

                    this.hideEditUserModal();
                    this.errors = {};

                    swal("Thành công", "Cập nhật tài khoản thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 401:
                            this.errors = error.response.data.message;
                            break;
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Cập nhật tài khoản thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            deleteUser: async function(user) {
                if (!confirm('Bạn có chất muốn xóa tài khoản này')) {
                    return
                }

                try {
                    await userService.deleteUser(user.id);

                    this.users = this.users.filter(obj => {
                        return obj.id != user.id;
                    });

                    swal("Thành công", "Xóa tài khoản thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 500:
                            swal("Thất bại", error.response.data.message, "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            }
        }
    }
</script>
