<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý danh sách chi tiết sản phẩm</h6>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewChiTietSanPhamModal"><span class="fa fa-plus"></span> Thêm chi tiết sản phẩm</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kích thước</th>
                                <th>Màu</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(chiSanPham,index) in listChiTietSanPham" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{chiSanPham.KichThuoc}}</td>
                                <td>{{chiSanPham.Mau}}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm" v-on:click="editChiTietSanPham(chiSanPham)" title="Cập nhật chi tiết sản phẩm"><span class="fa fa-edit"></span></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteChiTietSanPham(chiSanPham.id)" title="Xóa chi tiết sản phẩm"><span class="fa fa-trash"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="newChiTietSanPhamModal" hide-footer title="Thêm chi tiết sản phẩm">
            <form v-on:submit.prevent="createChiTietSanPham">
                <div class="form-group">
                    <label for="KichThuoc">Kích thước</label>
                    <input type="text" v-model="chiTietSanPhamData.KichThuoc" class="form-control" placeholder="Nhập kích thước">
                    <div class="invalid-feedback" v-if="errors.KichThuoc">{{errors.KichThuoc[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="Mau">Màu</label>
                    <input type="text" v-model="chiTietSanPhamData.Mau" class="form-control" placeholder="Nhập Màu">
                    <div class="invalid-feedback" v-if="errors.Mau">{{errors.Mau[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="MoTa">Mô tả</label>
                    <ckeditor v-model="chiTietSanPhamData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideNewChiTietSanPhamModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="editChiTietSanPhamModal" hide-footer title="Cập nhật chi tiết sản phẩm">
            <form v-on:submit.prevent="updateChiTietSanPham">
                <div class="form-group">
                    <label for="KichThuoc">Kích thước</label>
                    <input type="text" v-model="editChiTietSanPhamData.KichThuoc" class="form-control">
                    <div class="invalid-feedback" v-if="errors.KichThuoc">{{errors.KichThuoc[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="Mau">Màu</label>
                    <input type="text" v-model="editChiTietSanPhamData.Mau" class="form-control">
                    <div class="invalid-feedback" v-if="errors.Mau">{{errors.Mau[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="MoTa">Mô tả</label>
                    <ckeditor v-model="editChiTietSanPhamData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideEditChiTietSanPhamModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import * as sanPhamService from '../../services/sanPham_service.js';
    export default {
        name: "Products",
        data() {
            return {
                MaSP: this.$route.params.id,
                listChiTietSanPham: {},
                chiTietSanPhamData: {
                    KichThuoc: '',
                    Mau: '',
                    MoTa: ''
                },
                editChiTietSanPhamData: {},
                errors: {},
            }
        },
        mounted() {
            this.getListChiTietSanPham();
        },
        methods: {
            getListChiTietSanPham: async function()
            {
                try {
                    const response = await sanPhamService.getListChiTietSanPham(this.MaSP);
                    this.listChiTietSanPham = response.data;
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
            },
            showNewChiTietSanPhamModal() {
                this.$refs['newChiTietSanPhamModal'].show();
            },
            hideNewChiTietSanPhamModal() {
                this.$refs['newChiTietSanPhamModal'].hide();
            },
            createChiTietSanPham: async function() {
                try {
                    const formData = new FormData();
                    formData.append('MaSP',this.MaSP);
                    formData.append('KichThuoc',this.chiTietSanPhamData.KichThuoc);
                    formData.append('Mau',this.chiTietSanPhamData.Mau);
                    formData.append('MoTa',this.chiTietSanPhamData.MoTa);

                    const response = await sanPhamService.createChiTietSanPham(formData);
                    this.listChiTietSanPham.unshift(response.data);

                    this.hideNewChiTietSanPhamModal();
                    this.errors = {};
                    this.chiTietSanPhamData = {
                        KichThuoc: '',
                        Mau: '',
                        MoTa: ''
                    };

                    swal("Thành công", "Thêm chi tiết sản phẩm sản phẩm thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", error.response.data.message, "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            showEditChiTietSanPhamModal() {
                this.$refs['editChiTietSanPhamModal'].show();
            },
            hideEditChiTietSanPhamModal() {
                this.$refs['editChiTietSanPhamModal'].hide();
            },
            editChiTietSanPham(chiTietSanPham) {
                this.editChiTietSanPhamData = {...chiTietSanPham};
                this.showEditChiTietSanPhamModal();
            },
            updateChiTietSanPham: async function() {
                try {
                    const formData = new FormData();
                    formData.append('MaSP',this.MaSP);
                    formData.append('KichThuoc',this.editChiTietSanPhamData.KichThuoc);
                    formData.append('Mau',this.editChiTietSanPhamData.Mau);
                    formData.append('MoTa',this.editChiTietSanPhamData.MoTa);

                    const response = await sanPhamService.updateChiTietSanPham(this.editChiTietSanPhamData.id, formData);

                    this.listChiTietSanPham.map(chiTietSanPham => {
                        if (chiTietSanPham.id == response.data.id) {
                            for (let key in response.data) {
                                chiTietSanPham[key] = response.data[key];
                            }
                        }
                    });

                    this.hideEditChiTietSanPhamModal();
                    this.errors = {};

                    swal("Thành công", "Cập nhật loại sản phẩm thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", error.response.data.message, "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            deleteChiTietSanPham: async function(id) {
                if (!confirm('Bạn có chất muốn xóa danh mục này')) {
                    return
                }

                try {
                    await sanPhamService.deleteChiTietSanPham(id);

                    this.listChiTietSanPham = this.listChiTietSanPham.filter(obj => {
                        return obj.id != id;
                    });

                    swal("Thành công", "Xóa chi tiết sản phẩm thành công", "success");
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                }
            },
        }
    }
</script>

<style scoped>

</style>
