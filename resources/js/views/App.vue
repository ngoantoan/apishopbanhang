<template>
    <main>
        <router-view></router-view>
    </main>
</template>

<script>
    import * as authService from '../services/auth_service.js';
    export default {
        name: 'App',
        beforeCreate: async function() {
            try {
                if (authService.isLoggedIn()) {
                    const response = await authService.getProfile();
                    this.$store.dispatch('authenticate', response.data);
                }
            } catch (error) {
                authService.logout();
            }
        },
    }
</script>

<style scoped>

</style>
