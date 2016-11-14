"use strict";

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
                    page: 0,
                    limit: 20
                },
                list = {};

            tabMap.forEach(function(item) {
                list[item] = {
                    data: [],
                    queryData: Object.assign({}, queryData),
                    scrollTop: 0
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
                for (var key in obj.list) {
                    if (obj.list.hasOwnProperty(key)) {
                        state.list[obj.tab][key] = obj.list[key];
                    }
                }
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
            return new Promise((resolve, reject) => {
                commit("clearUserInfo");
                resolve();
            });
        },
    }
});

export default store;
