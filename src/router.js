import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import UserList from './components/UserList.vue'
import User from './components/User.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            redirect: {
                name: 'login'
            }
        }, {
            path: "/login",
            name: "login",
            component: Login
        }, {
            path: "/user-list",
            name: "user-list",
            component: UserList
        }, {
            path: '/user/:id',
            name: 'user',
            component: User
        }
    ]
})