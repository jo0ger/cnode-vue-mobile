"use strict"

import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "guide",
        component (resolve) {
            require(["../pages/guide.vue"], resolve);
        }
    },
    {
        path: "/index",
        name: "index",
        component (resolve) {
            require(["../pages/index.vue"], resolve);
        },
        children: [
            {
                path: "",
                name: "home",
                component (resolve) {
                    require(["../pages/home.vue"], resolve);
                },
                alias: "home"
            },{
                path: "message",
                name: "message",
                component (resolve) {
                    require(["../pages/message.vue"], resolve);
                }
            },{
                path: "me",
                name: "me",
                component (resolve) {
                    require(["../pages/me.vue"], resolve);
                }
            }
        ]
    }

];

export default new VueRouter({
    mode: "history",
    base: __dirname,
    routes: routes
});
