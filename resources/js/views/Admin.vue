<template>
    <main>
        <div id="wrapper">

            <Sidebar></Sidebar>

            <div id="content-wrapper" class="d-flex flex-column">

                <div id="content">

                    <Header></Header>

                    <router-view></router-view>

                </div>

                <Footer></Footer>

            </div>

        </div>

        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Bạn có chất muốn đăng xuất?</h5>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                </div>
                <div class="modal-body">Chọn "Đăng xuất" bên dưới, để thoát khỏi phiên làm việc của bạn</div>
                <div class="modal-footer">
                <button class="btn btn-danger" type="button" data-dismiss="modal">Hủy</button>
                <a class="btn btn-primary" href="">Đăng xuất</a>
                </div>
            </div>
            </div>
        </div>
    </main>
</template>

<script>
    import Sidebar from './layouts/Sidebar.vue';
    import Header from './layouts/Header.vue';
    import Footer from './layouts/Footer.vue';

    export default {
        name: "Admin",
        components: {
            Footer,
            Header,
            Sidebar
        }
    }
</script>

<style scoped>

</style>
