<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý loại mục sản phẩm</h6>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewSanPhamModal"><span class="fa fa-plus"></span> Thêm danh mục</button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Loại sản phẩm</th>
                                <th>Đơn giá</th>
                                <th>Ảnh</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(sanPham,index) in listSanPham" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{sanPham.TenSP}}</td>
                                <td>{{sanPham.loai_san_pham.Ten}}</td>
                                <td>{{formatPrice(sanPham.DongGia)}} vnđ</td>
                                <td>
                                    <!--img :src="`${$store.state.serverPath}/${sanPham.AnhChinh}`" width="50"-->
                                    <img :src="`${sanPham.AnhChinh}`" width="50">
                                </td>
                                <td>
                                    <router-link  :to="`/admin/danh-sach-chi-tiet-san-pham/${sanPham.id}`"><button class="btn btn-warning btn-sm" title="Danh sách chi tiết sản phẩm"><span class="fa fa-list"></span></button></router-link>
                                    <button class="btn btn-info btn-sm" v-on:click="sanPhamBoSuuTap(sanPham.id)" title="Sản phẩm Bộ sưu tập"><span class="fas fa-fw fa-cog"></span></button>
                                    <button class="btn btn-primary btn-sm" v-on:click="editProductCategory(sanPham)" title="Cập nhật sản phẩm"><span class="fa fa-edit"></span></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteSanPham(sanPham)" title="Xóa sản phẩm"><span class="fa fa-trash"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="newSanPhamModal" hide-footer title="Thêm sản phẩm">
            <form v-on:submit.prevent="createSanPham">
                <div class="form-group">
                    <label for="MaLoaiSanPham">Loại sản phẩm</label>
                    <select v-model="sanPhamData.MaLoaiSanPham" class="form-control">
                        <option value="">Chọn loại sản phẩm</option>
                        <option v-for="(loaiSanPham) in listLoaiSanPham" :value="loaiSanPham.id">{{loaiSanPham.Ten}}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.MaLoaiSanPham">{{errors.MaLoaiSanPham[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="TenSP">Tên</label>
                    <input type="text" v-model="sanPhamData.TenSP" class="form-control" placeholder="Nhập tên sản phẩm">
                    <div class="invalid-feedback" v-if="errors.TenSP">{{errors.TenSP[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="sanPhamData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="AnhChinh">Ảnh</label>
                    <input type="text" v-model="sanPhamData.AnhChinh" class="form-control" placeholder="Nhập link ảnh chính">
                    <div class="invalid-feedback" v-if="errors.AnhChinh">{{errors.AnhChinh[0]}}</div>
                </div>
                <!--div class="form-group">
                    <label for="AnhChinh">Ảnh</label>
                    <div v-if="sanPhamData.AnhChinh">
                        <img src="" ref="newSanPhamImageDisplay" width="100">
                    </div>
                    <input type="file" class="form-control" ref="newSanPhamImage" v-on:change="newAttachImage" id="AnhChinh">
                    <div class="invalid-feedback" v-if="errors.AnhChinh">{{errors.AnhChinh[0]}}</div>
                </div-->
                <div class="form-group">
                    <label for="DongGia">Đơn giá</label>
                    <input type="number" v-model="sanPhamData.DongGia" class="form-control" id="DongGia" placeholder="Nhập đơn giá sản phẩm">
                    <div class="invalid-feedback" v-if="errors.DongGia">{{errors.DongGia[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideNewSanPhamModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="editSanPhamModal" hide-footer title="Cập nhật sản phẩm">
            <form v-on:submit.prevent="updateSanPham">
                <div class="form-group">
                    <label for="MaLoaiSanPham">Loại sản phẩm</label>
                    <select v-model="editSanPhamData.MaLoaiSanPham" class="form-control">
                        <option value="">Chọn loại sản phẩm</option>
                        <option v-for="(loaiSanPham) in listLoaiSanPham" :value="loaiSanPham.id">{{loaiSanPham.Ten}}</option>
                    </select>
                    <div class="invalid-feedback" v-if="errors.MaLoaiSanPham">{{errors.MaLoaiSanPham[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="TenSP">Tên</label>
                    <input type="text" v-model="editSanPhamData.TenSP" class="form-control">
                    <div class="invalid-feedback" v-if="errors.TenSP">{{errors.TenSP[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="editSanPhamData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="AnhChinh">Ảnh</label>
                    <input type="text" v-model="editSanPhamData.AnhChinh" class="form-control" placeholder="Nhập link ảnh chính">
                    <div class="invalid-feedback" v-if="errors.AnhChinh">{{errors.AnhChinh[0]}}</div>
                </div>
                <!--div class="form-group">
                    <label for="image">Ảnh</label>
                    <div v-if="editSanPhamData.AnhChinh">
                        <img :src="`${$store.state.serverPath}/${editSanPhamData.AnhChinh}`" ref="editSanPhamImageDisplay" width="100">
                    </div>
                    <input type="file" class="form-control" ref="editSanPhamImage" v-on:change="editAttachImage">
                    <div class="invalid-feedback" v-if="errors.image">{{errors.image[0]}}</div>
                </div-->
                 <div class="form-group">
                    <label for="DongGia">Đơn giá</label>
                    <input type="number" v-model="editSanPhamData.DongGia" class="form-control" id="DongGia" placeholder="Nhập đơn giá sản phẩm">
                    <div class="invalid-feedback" v-if="errors.DongGia">{{errors.DongGia[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideEditSanPhamModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="sanPhamBoSuuTapModal" hide-footer title="Cập nhật sản phẩm bộ sưu tập">
            <form v-on:submit.prevent="createSanPhamBoSuTap">
                <div class="form-check" v-for="boSuuTap in listSanPhamBoSuTap">
                    <input class="form-check-input" type="checkbox" :value="boSuuTap.id" v-model="listCheckedId">
                    <label class="form-check-label" for="BoSuuTap">{{boSuuTap.TenBST}}</label>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideSanPhamBoSuuTapModal">Hủy</button>
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
                listLoaiSanPham: {},
                listSanPham: {},
                listSanPhamBoSuTap: {},
                sanPhamData: {
                    MaLoaiSanPham: '',
                    TenSP: '',
                    MoTa: '',
                    AnhChinh: '',
                    DongGia: ''
                },
                editSanPhamData: {},
                errors: {},
                idSanPham: '',
                listCheckedId: [],
            }
        },
        mounted() {
            this.getListSanPham();
            this.getListLoaiSanPham();
            this.getListSanPhamBoSuTap();
        },
        methods: {
            getListLoaiSanPham: async function() {
                try {
                    const response = await sanPhamService.getListLoaiSanPham();
                    this.listLoaiSanPham = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            getListSanPham: async function() {
                try {
                    const response = await sanPhamService.getListSanPham();
                    this.listSanPham = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            getListSanPhamBoSuTap: async function() {
                try {
                    const response = await sanPhamService.getListSanPhamBoSuTap();
                    this.listSanPhamBoSuTap = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            showNewSanPhamModal() {
                this.$refs['newSanPhamModal'].show();
            },
            hideNewSanPhamModal() {
                this.$refs['newSanPhamModal'].hide();
            },
            newAttachImage() {
                this.sanPhamData.AnhChinh = this.$refs.newSanPhamImage.files[0];

                const reader = new FileReader();
                reader.addEventListener('load',function () {
                    this.$refs.newSanPhamImageDisplay.src = reader.result;
                }.bind(this),false);

                reader.readAsDataURL(this.sanPhamData.AnhChinh);
            },
            createSanPham: async function() {
                try {
                    const formData = new FormData();
                    formData.append('MaLoaiSanPham',this.sanPhamData.MaLoaiSanPham);
                    formData.append('TenSP',this.sanPhamData.TenSP);
                    formData.append('MoTa',this.sanPhamData.MoTa);
                    formData.append('AnhChinh',this.sanPhamData.AnhChinh);
                    formData.append('DongGia',this.sanPhamData.DongGia);

                    const response = await sanPhamService.createSanPham(formData);
                    this.listSanPham.unshift(response.data);

                    this.hideNewSanPhamModal();
                    this.errors = {};
                    this.sanPhamData = {
                        MaLoaiSanPham: '',
                        TenSP: '',
                        MoTa: '',
                        AnhChinh: '',
                        DongGia: ''
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
            showEditSanPhamModal() {
                this.$refs['editSanPhamModal'].show();
            },
            hideEditSanPhamModal() {
                this.$refs['editSanPhamModal'].hide();
            },
            editAttachImage() {
                this.editSanPhamData.AnhChinh = this.$refs.editSanPhamImage.files[0];

                const reader = new FileReader();
                reader.addEventListener('load',function () {
                    this.$refs.editSanPhamImageDisplay.src = reader.result;
                }.bind(this),false);

                reader.readAsDataURL(this.editSanPhamData.AnhChinh);
            },
            editProductCategory(category) {
                this.editSanPhamData = {...category};
                this.showEditSanPhamModal();
            },
            updateSanPham: async function() {
                try {
                    const formData = new FormData();
                    formData.append('MaLoaiSanPham',this.editSanPhamData.MaLoaiSanPham);
                    formData.append('TenSP',this.editSanPhamData.TenSP);
                    formData.append('MoTa',this.editSanPhamData.MoTa);
                    formData.append('AnhChinh',this.editSanPhamData.AnhChinh);
                    formData.append('DongGia',this.editSanPhamData.DongGia);
                    formData.append('_method','put');

                    const response = await sanPhamService.updateSanPham(this.editSanPhamData.id, formData);

                    this.listSanPham.map(sanPham => {
                        if (sanPham.id == response.data.id) {
                            for (let key in response.data) {
                                sanPham[key] = response.data[key];
                            }
                        }
                    });

                    this.hideEditSanPhamModal();
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
            deleteSanPham: async function(sanPham) {
                if (!confirm('Bạn có chất muốn xóa danh mục này')) {
                    return
                }

                try {
                    await sanPhamService.deleteSanPham(sanPham.id);

                    this.listSanPham = this.listSanPham.filter(obj => {
                        return obj.id != sanPham.id;
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
            },
            formatPrice(price) {
                let val = (price/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            showSanPhamBoSuuTapModal() {
                this.$refs['sanPhamBoSuuTapModal'].show();
            },
            hideSanPhamBoSuuTapModal() {
                this.$refs['sanPhamBoSuuTapModal'].hide();
            },
            sanPhamBoSuuTap: async function(id) {
                this.idSanPham = id;

                const response = await sanPhamService.getBoSuTapCuaSanPham(id);
                this.listCheckedId = response.data;

                this.showSanPhamBoSuuTapModal();
            },
            createSanPhamBoSuTap: async function() {
                try {
                    const formData = new FormData();
                    formData.append('idSanPham',this.idSanPham);
                    formData.append('listCheckedId',this.listCheckedId);

                    const response = await sanPhamService.createSanPhamBoSuTap(formData);
                    console.log(response);

                    this.hideSanPhamBoSuuTapModal();

                    swal("Thành công", "Cập nhật danh sách sản phẩm bộ sưu thành công", "success");
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                }
            }
        }
    }
</script>

<style scoped>

</style>
