<template>
    <div id="app">
        <b-nav>
            <b-nav-item>
                <router-link v-if="loggedIn" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
            </b-nav-item>
        </b-nav>
        <router-view @loggedIn="setLoggedIn" />
    </div>
</template>

<script>
// import UserList from './components/UserList.vue'

export default {
    name: 'app',
    data() {
        return {
            loggedIn: false
        }
    },

    mounted() {
        if (!this.loggedIn) {
            this.$router.replace({ name: 'login' });
        }
    },
    methods: {
        setLoggedIn(status) {
            this.loggedIn = status;
        },
        logout() {
            this.loggedIn = false;
        }
    }
}
</script>