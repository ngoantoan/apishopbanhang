<template>
    <div class="container-fluid">

        <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex">
                <h6 class="m-0 font-weight-bold text-primary">Quản lý đơn hàng</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên khách hàng</th>
                                <th>SĐT</th>
                                <th>Ngày đặt hàng</th>
                                <th>Trạng thái</th>
                                <th>Đơn giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order,index) in listOrders" :key="index">
                                <td>{{index+1}}</td>
                                <td>{{order.name}}</td>
                                <td>{{order.phone}}</td>
                                <td>{{order.NgayTao}}</td>
                                <td><div v-html="statusOrder(order.TrangThai)" /> </td>
                                <td>{{formatPrice(order.TongGia)}} vnđ</td>
                                <td>
                                    <button class="btn btn-primary btn-sm" title="Chi tiết đơn hàng"  v-on:click="orderDetail(order)"><span class="fa fa-edit"></span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <b-modal ref="orderDetailModal" hide-footer title="Thông tin đơn hàng">
            <form v-on:submit.prevent="updateBoSuuTap">
                <div class="form-group">
                    <label for="name">Tên khách hàng</label>
                    <input type="text" v-model="orderDetailData.name" class="form-control">
                </div>
                <div class="form-group">
                    <label for="phone">Số điện thoại</label>
                    <input type="text" v-model="orderDetailData.phone" class="form-control">
                </div>
                <div class="form-group">
                    <label for="address">Địa chỉ</label>
                    <input type="text" v-model="orderDetailData.address" class="form-control">
                </div>
                <div class="form-group">
                    <label for="city">Thành phố</label>
                    <input type="text" v-model="orderDetailData.city" class="form-control">
                </div>
                <div class="form-group">
                    <label for="district">Quận</label>
                    <input type="text" v-model="orderDetailData.district" class="form-control">
                </div>
                <div class="form-group">
                    <label for="TongGia">Đơn giá</label>
                    <input type="text" v-model="orderDetailData.TongGia" class="form-control" readonly>
                </div>
                <div class="form-group">
                    <label for="TrangThai">Trạng thái</label>
                    <select v-model="orderDetailData.TrangThai" class="form-control">
                        <option v-for="(trangThai) in listTrangThai" :value="trangThai.id">{{trangThai.Ten}}</option>
                    </select>
                </div>
                <div class="float-right">
                    <button type="button" class="btn btn-danger" v-on:click="hideOrderDetailModal">Đóng</button>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
    import * as orderService from '../../services/order_service';

    export default {
        name: "Order",
        data() {
            return {
                listOrders: {},
                errors: {},
                orderDetailData: {},
                listTrangThai: [
                    { id: 1, 'Ten': 'Chờ xác nhận' },
                    { id: 2, 'Ten': 'Đã xác nhận' },
                    { id: 3, 'Ten': 'Đã giao hàng' },
                    { id: 4, 'Ten': 'Bị hủy' },
                    { id: 5, 'Ten': 'Hoàn thành' },
                ]
            }
        },
        mounted() {
            this.getListOrders();
        },
        methods: {
            statusOrder(status) {
                switch (status) {
                    case 2:
                        return `<span class="badge badge-info">Đã xác nhận</span>`;
                        break;
                    case 3:
                        return `<span class="badge badge-primary">Đã giao hàng</span>`;
                        break;
                    case 4:
                        return `<span class="badge badge-danger">Bị hủy</span>`;
                        break;
                    case 5:
                        return `<span class="badge badge-success">Hoàn thành</span>`;
                        break;
                    default:
                        return `<span class="badge badge-warning">Chờ xác nhận</span>`;
                        break;
                }
            },
            formatPrice(price) {
                let val = (price/1).toFixed(2).replace('.', ',')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            getListOrders: async function()
            {
                try {
                    const response = await orderService.getListOrders();
                    this.listOrders = response.data;
                } catch (error) {
                    swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng tải lại", "error");
                }
            },
            showOrderDetailModal() {
                this.$refs['orderDetailModal'].show();
            },
            orderDetail(order) {
                this.showOrderDetailModal();
                this.orderDetailData = {...order};
            },
            hideOrderDetailModal() {
                this.$refs['orderDetailModal'].hide();
            },
            // createBoSuuTap: async function() {
            //     try {
            //         const formData = new FormData();
            //         formData.append('TenBST',this.boSuuTapData.TenBST);
            //         formData.append('MoTa',this.boSuuTapData.MoTa);
            //         formData.append('AnhChinh',this.boSuuTapData.AnhChinh);
            //
            //         const response = await boSuuTapService.createBoSuuTap(formData);
            //         this.listBoSuuTap.unshift(response.data);
            //
            //         this.hideNewBoSuuTapModal();
            //         this.errors = {};
            //         this.boSuuTapData = {
            //             TenBST: '',
            //             MoTa: ''
            //         };
            //
            //         swal("Thành công", "Thêm bộ sưu tập thành công", "success");
            //     } catch (error) {
            //         switch (error.response.status) {
            //             case 422:
            //                 this.errors = error.response.data.errors;
            //                 break;
            //             case 500:
            //                 swal("Thất bại", "Thêm bộ sưu tập thất bại, xin vui lòng thử lại!", "error");
            //                 break;
            //             default:
            //                 swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
            //                 break;
            //         }
            //     }
            // },
            // showEditBoSuuTapModal() {
            //     this.$refs['editBoSuuTapModal'].show();
            // },
            // hideEditBoSuuTapModal() {
            //     this.$refs['editBoSuuTapModal'].hide();
            // },
            // editBoSuuTap(boSuuTap) {
            //     this.editBoSuuTapData = {...boSuuTap};
            //     this.showEditBoSuuTapModal();
            // },
            // updateBoSuuTap: async function() {
            //     try {
            //         const formData = new FormData();
            //         formData.append('TenBST',this.editBoSuuTapData.TenBST);
            //         formData.append('MoTa',this.editBoSuuTapData.MoTa);
            //         formData.append('AnhChinh',this.editBoSuuTapData.AnhChinh);
            //         formData.append('_method','put');
            //
            //         const response = await boSuuTapService.updateBoSuuTap(this.editBoSuuTapData.id, formData);
            //
            //         this.listBoSuuTap.map(boSuuTap => {
            //             if (boSuuTap.id == response.data.id) {
            //                 for (let key in response.data) {
            //                     boSuuTap[key] = response.data[key];
            //                 }
            //             }
            //         });
            //
            //         this.hideEditBoSuuTapModal();
            //         this.errors = {};
            //
            //         swal("Thành công", "Cập nhật bộ sưu tập thành công", "success");
            //     } catch (error) {
            //         switch (error.response.status) {
            //             case 422:
            //                 this.errors = error.response.data.errors;
            //                 break;
            //             case 500:
            //                 swal("Thất bại", "Thêm bộ sưu tập thất bại, xin vui lòng thử lại!", "error");
            //                 break;
            //             default:
            //                 swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
            //                 break;
            //         }
            //     }
            // },
            // deleteBoSuuTap: async function(boSuuTap) {
            //     if (!confirm('Bạn có chất muốn xóa danh mục này')) {
            //         return
            //     }
            //
            //     try {
            //         await boSuuTapService.deleteBoSuuTap(boSuuTap.id);
            //
            //         this.listBoSuuTap = this.listBoSuuTap.filter(obj => {
            //             return obj.id != boSuuTap.id;
            //         });
            //
            //         swal("Thành công", "Xóa bộ sưu tập thành công", "success");
            //     } catch (error) {
            //         switch (error.response.status) {
            //             case 500:
            //                 swal("Thất bại", error.response.data.message, "error");
            //                 break;
            //             default:
            //                 swal("Thất bại", "Một số lỗi đã xảy ra, xin vui lòng Thử lại", "error");
            //                 break;
            //         }
            //     }
            // },
        }
    }
</script>

<style scoped>

</style>
