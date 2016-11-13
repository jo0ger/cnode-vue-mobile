import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        user: {
            id: localStorage.id || "",
            loginname: localStorage.loginname || "",
            avatar: localStorage.avatar || "",
            accesstoken: localStorage.accesstoken || "",
            score: localStorage.score || null,
            message: localStorage.message || null
        },
        list: (function() {
            let tabMap = ["all", "good", "share", "ask", "job"],
                queryData = {
                    page: 1,
                    limit: 20,
                    mdrender: true
                },
                list = {};

            tabMap.map(function(item) {
                list[item] = {
                    data: [],
                    queryData: Object.assign({}, queryData)
                };
                list[item].queryData.tab = item;
            })
            return list
        })(),
    },
    getters: {
        getUserInfo: state => {
            return state.user || {};
        },
        getList: state => {
            return state.list || {};
        }
    },
    mutations: {
        setUserInfo: (state, user) => {
            state.user = Object.assign({}, state.user, user);
        },
        clearUserInfo: state => {
            state.user = {
                id: "",
                loginname: "",
                avatar: "",
                accesstoken: "",
                score: null,
                message: null
            }
        },
        setUserValue: (state, obj) => {
            if (obj && obj.key) {
                state.user[obj.key] = obj.value;
            }
        },
        setListValue: (state, obj) => {
            if (obj && obj.tab) {
                state.list[obj.key] = obj.value;
            }
        }
    },
    actions: {
        setUserInfo: ({
            commit
        }, user) => {
            return new Promise(function(resolve, reject) {
                commit("setUserInfo", user);
                resolve();
            });
        },
        clearUserInfo: ({
            commit
        }) => {
            return new Promise(function(resolve, reject) {
                commit("clearUserInfo");
                resolve();
            });
        },
    }
});

export default store;
