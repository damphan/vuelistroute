import user from '../../api/user'

export default {
    namespaced: true,
    state: {
        userList: [],
        page: 1,
        total: 0,
        startCallback: undefined,
        endCallback: undefined
    },
    getters: {
        getUserList: state => {
            return state.userList
        }
    },
    mutations: {
        reload: (state, userList) => {
            state.userList = userList
        }
    },
    actions: {
        reloadPerPage ({state, dispatch}, perPage) {
            state.perPage = perPage;
            dispatch('reload', 1);
        },
        reload ({commit, state}, opts) {
            if (typeof(opts) == 'object') {
                state.page = opts.page;
                state.perPage = opts.perPage;
                state.startCallback = opts.startCallback;
                state.endCallback = opts.endCallback;
            } else if (opts) {
                state.page = opts;
            }
            state.startCallback();

            user.getUsers(state.page, state.perPage)
                .catch(() => {
                    state.page = 1;
                    state.total = 0;
                })
                .then((response) => {
                    if (response) {
                        state.page = response.data.page;
                        state.total = response.data.total;
                        commit('reload', response.data.data);
                    }
                    state.endCallback(state.page, state.total);
                });

            // const axios = require('axios');
            // axios.get('https://reqres.in/api/users?page=' + state.page + '&per_page=' + state.perPage)
            //     .then(response => {
            //         if (response.status == 200) {
            //             state.page = response.data.page;
            //             state.total = response.data.total;
            //             commit('reload', response.data.data);
            //         }
            //         // console.log(this.$emit)
            //     })
            //     .catch(() => {
            //         state.page = 1;
            //         state.total = 0;
            //         // console.log(error)
            //     })
            //     .then(() => {
            //         state.endCallback(state.page, state.total);
            //     });
            // commit('reload', [{"id":1,"first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"},{"id":2,"first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},{"id":3,"first_name":"Emma","last_name":"Wong","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"},{"id":4,"first_name":"Eve","last_name":"Holt","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"},{"id":5,"first_name":"Charles","last_name":"Morris","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"}])
        }
    }
}