export default {
    getUsers(page, perPage) {
        const axios = require('axios');
        return axios.get('https://reqres.in/api/users?page=' + page + '&per_page=' + perPage)
    },

    getUser(id) {
        const axios = require('axios');
        return axios.get('https://reqres.in/api/users/' + id)
    },

    login(userId, pass) {
        const axios = require('axios');
        return axios.post('https://reqres.in/api/login', {email: userId, password: pass});
    }
}