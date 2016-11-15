"use strict"

import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "guide",
        component(resolve) {
            require(["../pages/guide.vue"], resolve);
        }
    }, {
        path: "/index",
        name: "index",
        component(resolve) {
            require(["../pages/index.vue"], resolve);
        },
        children: [{
            path: "",
            name: "home",
            component(resolve) {
                require(["../pages/home.vue"], resolve);
            },
            alias: "home"
        }, {
            path: "message",
            name: "message",
            component(resolve) {
                require(["../pages/message.vue"], resolve);
            },
            meta: {
                auth: true
            }
        }, {
            path: "setup",
            name: "setup",
            component(resolve) {
                require(["../pages/setup.vue"], resolve);
            }
        }, {
            path: "about",
            name: "about",
            component(resolve) {
                require(["../pages/about.vue"], resolve);
            }
        }]
    }, {
        path: "/login",
        name: "login",
        component(resolve) {
            require(["../pages/login.vue"], resolve);
        }
    }

];

const router = new VueRouter({
    mode: "history",
    base: __dirname,
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

router.beforeEach((to, from, next) => {
    //如果要求登录验证
    if (to.matched.some(record => record.meta.auth)) {
        //如果from是首页，将curNav设置为from的name，方便返回的时候
        if(from.matched.some(index => index.name === "index")){
            sessionStorage.setItem("curNav", from.name);
        }
        if(this.a.app.$store.getters.getUserInfo.id){
            next();
        }else {
            next({
                name: "login",
                query: {
                    back: from,
                    to: to
                }
            });
        }
    } else {
        next();
    }
});

export default router;
