"use strict"

import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        component (resolve) {
            require(["../pages/index.vue"], resolve);
        }
    },{
        path: "/"
    }
];

export default new VueRouter({
    mode: "history",
    base: __dirname,
    routes: routes
});
