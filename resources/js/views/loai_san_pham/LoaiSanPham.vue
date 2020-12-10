<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý loại mục sản phẩm</h6>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewLoaiSanPhamModal"><span class="fa fa-plus"></span> Thêm danh mục</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Ảnh</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(loaiSanPham,index) in listLoaiSanPham" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{loaiSanPham.Ten}}</td>
                                <td>
                                    <!--img :src="`${$store.state.serverPath}/${loaiSanPham.HinhAnh}`" width="50"-->
                                    <img :src="`${loaiSanPham.HinhAnh}`" width="50">
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-sm" v-on:click="editProductCategory(loaiSanPham)"><span class="fa fa-edit"></span></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteLoaiSanPham(loaiSanPham)"><span class="fa fa-trash"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="newLoaiSanPhamModal" hide-footer title="Thêm loại sản phẩm">
            <form v-on:submit.prevent="createLoaiSanPham">
                <div class="form-group">
                    <label for="name">Tên</label>
                    <input type="name" v-model="loaiSanPhamData.Ten" class="form-control" id="name" placeholder="Nhập tên loại sản phẩm">
                    <div class="invalid-feedback" v-if="errors.Ten">{{errors.Ten[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="loaiSanPhamData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="name">Ảnh</label>
                    <input type="name" v-model="loaiSanPhamData.HinhAnh" class="form-control" id="name" placeholder="Nhập link ảnh loại sản phẩm">
                    <div class="invalid-feedback" v-if="errors.HinhAnh">{{errors.HinhAnh[0]}}</div>
                </div>
                <!--div class="form-group">
                    <label for="HinhAnh">Ảnh</label>
                    <div v-if="loaiSanPhamData.HinhAnh">
                        <img src="" ref="newLoaiSanPhamImageDisplay" width="100">
                    </div>
                    <input type="file" class="form-control" ref="newLoaiSanPhamImage" v-on:change="newAttachImage" id="HinhAnh">
                    <div class="invalid-feedback" v-if="errors.HinhAnh">{{errors.HinhAnh[0]}}</div>
                </div-->
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideNewLoaiSanPhamModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="editLoaiSanPhamModal" hide-footer title="Cập nhật loại sản phẩm">
            <form v-on:submit.prevent="updateLoaiSanPham">
                <div class="form-group">
                    <label for="name">Tên</label>
                    <input type="name" v-model="editLoaiSanPhamData.Ten" class="form-control" id="name">
                    <div class="invalid-feedback" v-if="errors.Ten">{{errors.Ten[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="editLoaiSanPhamData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="name">Ảnh</label>
                    <input type="name" v-model="editLoaiSanPhamData.HinhAnh" class="form-control" id="name">
                    <div class="invalid-feedback" v-if="errors.HinhAnh">{{errors.HinhAnh[0]}}</div>
                </div>
                <!--div class="form-group">
                    <label for="image">Ảnh</label>
                    <div v-if="editLoaiSanPhamData.HinhAnh">
                        <img :src="`${$store.state.serverPath}/${editLoaiSanPhamData.HinhAnh}`" ref="editLoaiSanPhamImageDisplay" width="100">
                    </div>
                    <input type="file" class="form-control" ref="editLoaiSanPhamImage" v-on:change="editAttachImage">
                    <div class="invalid-feedback" v-if="errors.image">{{errors.image[0]}}</div>
                </div-->
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideEditLoaiSanPhamModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import * as loaiSanPhamService from '../../services/loaiSanPham_service.js';

    export default {
        name: "Categories",
        data() {
            return {
                listLoaiSanPham: {},
                loaiSanPhamData: {
                    Ten: '',
                    HinhAnh: '',
                    MoTa: ''
                },
                editLoaiSanPhamData: {},
                errors: {},
            }
        },
        mounted() {
            this.getListLoaiSanPham();
        },
        methods: {
            getListLoaiSanPham: async function()
            {
                try {
                    const response = await loaiSanPhamService.getListLoaiSanPham();
                    this.listLoaiSanPham = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            showNewLoaiSanPhamModal() {
                this.$refs['newLoaiSanPhamModal'].show();
            },
            hideNewLoaiSanPhamModal() {
                this.$refs['newLoaiSanPhamModal'].hide();
            },
            newAttachImage() {
                this.loaiSanPhamData.HinhAnh = this.$refs.newLoaiSanPhamImage.files[0];

                const reader = new FileReader();
                reader.addEventListener('load',function () {
                    this.$refs.newLoaiSanPhamImageDisplay.src = reader.result;
                }.bind(this),false);

                reader.readAsDataURL(this.loaiSanPhamData.HinhAnh);
            },
            createLoaiSanPham: async function() {
                try {
                    const formData = new FormData();
                    formData.append('Ten',this.loaiSanPhamData.Ten);
                    formData.append('HinhAnh',this.loaiSanPhamData.HinhAnh);
                    formData.append('MoTa',this.loaiSanPhamData.MoTa);

                    const response = await loaiSanPhamService.createLoaiSanPham(formData);
                    this.listLoaiSanPham.unshift(response.data);

                    this.hideNewLoaiSanPhamModal();
                    this.errors = {};
                    this.loaiSanPhamData = {
                        Ten: '',
                        HinhAnh: '',
                        MoTa: ''
                    };

                    swal("Thành công", "Thêm loại sản phẩm thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm loại sản phẩm thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            showEditLoaiSanPhamModal() {
                this.$refs['editLoaiSanPhamModal'].show();
            },
            hideEditLoaiSanPhamModal() {
                this.$refs['editLoaiSanPhamModal'].hide();
            },
            editAttachImage() {
                this.editLoaiSanPhamData.HinhAnh = this.$refs.editLoaiSanPhamImage.files[0];

                const reader = new FileReader();
                reader.addEventListener('load',function () {
                    this.$refs.editLoaiSanPhamImageDisplay.src = reader.result;
                }.bind(this),false);

                reader.readAsDataURL(this.editLoaiSanPhamData.HinhAnh);
            },
            editProductCategory(category) {
                this.editLoaiSanPhamData = {...category};
                this.showEditLoaiSanPhamModal();
            },
            updateLoaiSanPham: async function() {
                try {
                    const formData = new FormData();
                    formData.append('Ten',this.editLoaiSanPhamData.Ten);
                    formData.append('MoTa',this.editLoaiSanPhamData.MoTa);
                    formData.append('HinhAnh',this.editLoaiSanPhamData.HinhAnh);
                    formData.append('_method','put');

                    const response = await loaiSanPhamService.updateLoaiSanPham(this.editLoaiSanPhamData.id, formData);

                    this.listLoaiSanPham.map(loaiSanPham => {
                        if (loaiSanPham.id == response.data.id) {
                            for (let key in response.data) {
                                loaiSanPham[key] = response.data[key];
                            }
                        }
                    });

                    this.hideEditLoaiSanPhamModal();
                    this.errors = {};

                    swal("Thành công", "Cập nhật loại sản phẩm thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm loại sản phẩm thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            deleteLoaiSanPham: async function(loaiSanPham) {
                if (!confirm('Bạn có chất muốn xóa danh mục này')) {
                    return
                }

                try {
                    await loaiSanPhamService.deleteLoaiSanPham(loaiSanPham.id);

                    this.listLoaiSanPham = this.listLoaiSanPham.filter(obj => {
                        return obj.id != loaiSanPham.id;
                    });

                    swal("Thành công", "Xóa loại sản phẩm thành công", "success");
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

<style scoped>

</style>
