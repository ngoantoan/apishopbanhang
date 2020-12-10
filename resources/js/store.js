import Vue from 'vue';
import Vuex from 'vuex';
import * as authService from './services/auth_service';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: null,
        profile: {},
        // apiURL: 'http://apishopbanhang.test/api/admin',
        // serverPath: 'http://apishopbanhang.test',
        apiURL: 'https://apishopbanhang.herokuapp.com/api/admin',
        serverPath: 'https://apishopbanhang.herokuapp.com/',
    },
    mutations: {
        authenticate(state, payload) {
            state.isLoggedIn = authService.isLoggedIn();
            if (state.isLoggedIn) {
                state.profile = payload;
            } else {
                state.profile = {};
            }
        }
    },
    actions: {
        authenticate(context, payload) {
            context.commit('authenticate', payload);
        }
    }
})
