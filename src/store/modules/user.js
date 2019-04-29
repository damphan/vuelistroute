import userApi from '../../api/user'

export default {
    namespaced: true,
    state: {
        user: null
    },
    getters: {
        getUser: state => {
            return state.user
        }
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user
        }
    },
    actions: {
        resetUser({commit}) {
            commit('setUser', null)
        },
        getUser({commit}, id) {
            userApi.getUser(id)
                .catch(() => {
                    commit('setUser', null);
                })
                .then((response) => {
                    if (response) {
                        commit('setUser', response.data.data);
                    } else {
                        commit('setUser', null);
                    }
                });
        }
    }
}