<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý bộ sưu tập</h6>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewBoSuuTapModal"><span class="fa fa-plus"></span> Thêm bộ sưu tập</button>
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
                            <tr v-for="(boSuuTap,index) in listBoSuuTap" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{boSuuTap.TenBST}}</td>
                                <td>
                                    <img :src="`${boSuuTap.AnhChinh}`" width="50">
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-sm" v-on:click="editBoSuuTap(boSuuTap)" title="Cập nhật bộ sưu tập"><span class="fa fa-edit"></span></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteBoSuuTap(boSuuTap)" title="Xóa bộ sưu tập"><span class="fa fa-trash"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="newBoSuuTapModal" hide-footer title="Thêm bộ sưu tập">
            <form v-on:submit.prevent="createBoSuuTap">
                <div class="form-group">
                    <label for="TenBST">Tên</label>
                    <input type="text" v-model="boSuuTapData.TenBST" class="form-control" placeholder="Nhập tên bộ sưu tập">
                    <div class="invalid-feedback" v-if="errors.TenBST">{{errors.TenBST[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="boSuuTapData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="AnhChinh">Ảnh</label>
                    <input type="text" v-model="boSuuTapData.AnhChinh" class="form-control" placeholder="Nhập link ảnh chính">
                    <div class="invalid-feedback" v-if="errors.AnhChinh">{{errors.AnhChinh[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideNewBoSuuTapModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="editBoSuuTapModal" hide-footer title="Cập nhật bộ sưu tập">
            <form v-on:submit.prevent="updateBoSuuTap">
                <div class="form-group">
                    <label for="TenBST">Tên</label>
                    <input type="text" v-model="editBoSuuTapData.TenBST" class="form-control">
                    <div class="invalid-feedback" v-if="errors.TenBST">{{errors.TenBST[0]}}</div>
                </div>
                 <div class="form-group">
                    <label for="motaSua">Mô tả</label>
                    <ckeditor v-model="editBoSuuTapData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="AnhChinh">Ảnh</label>
                    <input type="text" v-model="editBoSuuTapData.AnhChinh" class="form-control" placeholder="Nhập link ảnh chính">
                    <div class="invalid-feedback" v-if="errors.AnhChinh">{{errors.AnhChinh[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideEditBoSuuTapModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import * as boSuuTapService from '../../services/boSuuTap_service';

    export default {
        name: "BoSuuTap",
        data() {
            return {
                listBoSuuTap: {},
                boSuuTapData: {
                    TenBST: '',
                    MoTa: '',
                    AnhChinh: ''
                },
                editBoSuuTapData: {},
                errors: {},
            }
        },
        mounted() {
            this.getListBoSuuTap();
        },
        methods: {
            getListBoSuuTap: async function()
            {
                try {
                    const response = await boSuuTapService.getListBoSuuTap();
                    this.listBoSuuTap = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            showNewBoSuuTapModal() {
                this.$refs['newBoSuuTapModal'].show();
            },
            hideNewBoSuuTapModal() {
                this.$refs['newBoSuuTapModal'].hide();
            },
            createBoSuuTap: async function() {
                try {
                    const formData = new FormData();
                    formData.append('TenBST',this.boSuuTapData.TenBST);
                    formData.append('MoTa',this.boSuuTapData.MoTa);
                    formData.append('AnhChinh',this.boSuuTapData.AnhChinh);

                    const response = await boSuuTapService.createBoSuuTap(formData);
                    this.listBoSuuTap.unshift(response.data);

                    this.hideNewBoSuuTapModal();
                    this.errors = {};
                    this.boSuuTapData = {
                        TenBST: '',
                        MoTa: ''
                    };

                    swal("Thành công", "Thêm bộ sưu tập thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm bộ sưu tập thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            showEditBoSuuTapModal() {
                this.$refs['editBoSuuTapModal'].show();
            },
            hideEditBoSuuTapModal() {
                this.$refs['editBoSuuTapModal'].hide();
            },
            editBoSuuTap(boSuuTap) {
                this.editBoSuuTapData = {...boSuuTap};
                this.showEditBoSuuTapModal();
            },
            updateBoSuuTap: async function() {
                try {
                    const formData = new FormData();
                    formData.append('TenBST',this.editBoSuuTapData.TenBST);
                    formData.append('MoTa',this.editBoSuuTapData.MoTa);
                    formData.append('AnhChinh',this.editBoSuuTapData.AnhChinh);
                    formData.append('_method','put');

                    const response = await boSuuTapService.updateBoSuuTap(this.editBoSuuTapData.id, formData);

                    this.listBoSuuTap.map(boSuuTap => {
                        if (boSuuTap.id == response.data.id) {
                            for (let key in response.data) {
                                boSuuTap[key] = response.data[key];
                            }
                        }
                    });

                    this.hideEditBoSuuTapModal();
                    this.errors = {};

                    swal("Thành công", "Cập nhật bộ sưu tập thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm bộ sưu tập thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            deleteBoSuuTap: async function(boSuuTap) {
                if (!confirm('Bạn có chất muốn xóa danh mục này')) {
                    return
                }

                try {
                    await boSuuTapService.deleteBoSuuTap(boSuuTap.id);

                    this.listBoSuuTap = this.listBoSuuTap.filter(obj => {
                        return obj.id != boSuuTap.id;
                    });

                    swal("Thành công", "Xóa bộ sưu tập thành công", "success");
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
        }
    }
</script>

<style scoped>

</style>
