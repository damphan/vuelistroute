import Vue from 'vue'
import Vuex from 'vuex'
import userList from './modules/userList'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        userList
    }
})