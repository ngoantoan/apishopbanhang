<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý slider</h6>
                <button class="btn btn-primary btn-sm ml-auto" v-on:click="showNewSliderModal"><span class="fa fa-plus"></span> Thêm danh mục</button>
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
                            <tr v-for="(slider,index) in listSlider" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{slider.TenBST}}</td>
                                <td>
                                    <img :src="`${slider.Anh}`" width="50">
                                </td>
                                <td>
                                    <button class="btn btn-primary btn-sm" v-on:click="editSlider(slider)"><span class="fa fa-edit"></span></button>
                                    <button class="btn btn-danger btn-sm" v-on:click="deleteSlider(slider)"><span class="fa fa-trash"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="newSliderModal" hide-footer title="Thêm slider">
            <form v-on:submit.prevent="createSlider">
                <div class="form-group">
                    <label for="name">Tên</label>
                    <input type="name" v-model="sliderData.TenBST" class="form-control" id="name" placeholder="Nhập tên slider">
                    <div class="invalid-feedback" v-if="errors.TenBST">{{errors.TenBST[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="sliderData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="name">Ảnh</label>
                    <input type="name" v-model="sliderData.Anh" class="form-control" id="name" placeholder="Nhập link ảnh slider">
                    <div class="invalid-feedback" v-if="errors.Anh">{{errors.Anh[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideNewSliderModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>

        <b-modal ref="editSliderModal" hide-footer title="Cập nhật loại sản phẩm">
            <form v-on:submit.prevent="updateSlider">
                <div class="form-group">
                    <label for="name">Tên</label>
                    <input type="name" v-model="editSliderData.TenBST" class="form-control" id="name">
                    <div class="invalid-feedback" v-if="errors.TenBST">{{errors.TenBST[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="motaThem">Mô tả</label>
                    <ckeditor v-model="editSliderData.MoTa"></ckeditor>
                    <div class="invalid-feedback" v-if="errors.MoTa">{{errors.MoTa[0]}}</div>
                </div>
                <div class="form-group">
                    <label for="name">Ảnh</label>
                    <input type="name" v-model="editSliderData.Anh" class="form-control" id="name">
                    <div class="invalid-feedback" v-if="errors.Anh">{{errors.Anh[0]}}</div>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideEditSliderModal">Hủy</button>
                    <button type="submit" class="btn btn-primary">Lưu</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import * as sliderService from '../../services/slider_service.js';

    export default {
        name: "Categories",
        data() {
            return {
                listSlider: {},
                sliderData: {
                    TenBST: '',
                    MoTa: '',
                    Anh: ''
                },
                editSliderData: {},
                errors: {},
            }
        },
        mounted() {
            this.getListSlider();
        },
        methods: {
            getListSlider: async function()
            {
                try {
                    const response = await sliderService.getListSlider();
                    this.listSlider = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            showNewSliderModal() {
                this.$refs['newSliderModal'].show();
            },
            hideNewSliderModal() {
                this.$refs['newSliderModal'].hide();
            },
            createSlider: async function() {
                try {
                    const formData = new FormData();
                    formData.append('TenBST',this.sliderData.TenBST);
                    formData.append('MoTa',this.sliderData.MoTa);
                    formData.append('Anh',this.sliderData.Anh);

                    const response = await sliderService.createSlider(formData);
                    this.listSlider.unshift(response.data);

                    this.hideNewSliderModal();
                    this.errors = {};
                    this.sliderData = {
                        TenBST: '',
                        MoTa: '',
                        Anh: ''
                    };

                    swal("Thành công", "Thêm slider phẩm thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm slider thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            showEditSliderModal() {
                this.$refs['editSliderModal'].show();
            },
            hideEditSliderModal() {
                this.$refs['editSliderModal'].hide();
            },
            editSlider(slider) {
                this.editSliderData = {...slider};
                this.showEditSliderModal();
            },
            updateSlider: async function() {
                try {
                    const formData = new FormData();
                    formData.append('TenBST',this.editSliderData.TenBST);
                    formData.append('MoTa',this.editSliderData.MoTa);
                    formData.append('Anh',this.editSliderData.Anh);
                    formData.append('_method','put');

                    const response = await sliderService.updateSlider(this.editSliderData.id, formData);

                    this.listSlider.map(slider => {
                        if (slider.id == response.data.id) {
                            for (let key in response.data) {
                                slider[key] = response.data[key];
                            }
                        }
                    });

                    this.hideEditSliderModal();
                    this.errors = {};

                    swal("Thành công", "Cập nhật slider thành công", "success");
                } catch (error) {
                    switch (error.response.status) {
                        case 422:
                            this.errors = error.response.data.errors;
                            break;
                        case 500:
                            swal("Thất bại", "Thêm slider thất bại, xin vui lòng thử lại!", "error");
                            break;
                        default:
                            swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
                            break;
                    }
                }
            },
            deleteSlider: async function(slider) {
                if (!confirm('Bạn có chất muốn xóa slider này')) {
                    return
                }

                try {
                    await sliderService.deleteSlider(slider.id);

                    this.listSlider = this.listSlider.filter(obj => {
                        return obj.id != slider.id;
                    });

                    swal("Thành công", "Xóa slider thành công", "success");
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
