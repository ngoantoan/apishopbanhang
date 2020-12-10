import Vue from 'vue';
import App from './views/App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue)

import CKEditor from 'ckeditor4-vue';
Vue.use( CKEditor )

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
