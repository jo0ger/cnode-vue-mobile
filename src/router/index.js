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
                },
                meta: {
                    auth: true
                }
            },{
                path: "me",
                name: "me",
                component (resolve) {
                    require(["../pages/me.vue"], resolve);
                }
            },{
                path: "about",
                name: "about",
                component (resolve) {
                    require(["../pages/about.vue"], resolve);
                }
            }
        ]
    },{
        path: "/login",
        name: "login",
        component (resolve){
            require(["../pages/login.vue"], resolve);
        }
    }

];

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: routes
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.auth)){
        console.log(from);
        next({
            name: "login",
            query: {
                redirect: encodeURIComponent(from.fullPath)
            }
        })
    }else{
        next();
    }
});

export default router;
