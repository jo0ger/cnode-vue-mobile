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
    }]
}, {
    path: "/login",
    name: "login",
    component(resolve) {
        require(["../pages/login.vue"], resolve);
    }
}, {
    path: "/topic/:id",
    name: "topic",
    component(resolve) {
        require(["../pages/topic.vue"], resolve);
    }
}, {
    path: "/user/:name",
    name: "user",
    component: (resolve) => {
        require(["../pages/user.vue"], resolve);
    }
}, {
    path: "about",
    name: "about",
    component(resolve) {
        require(["../pages/about.vue"], resolve);
    }
}];

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
        if (this.a.app.$store.getters.getUserInfo.id) {
            next();
        } else {
            //如果from是首页，将curNav设置为from的name，方便返回的时候
            if (from.matched.some(index => index.name === "index")) {
                //设置nextCurNav的原因是未登录时，进入首页message，会跳转到login
                //然后有两种情况
                // 1. back index页面还是取curNav
                // 2. login curNav将变为nextCurNav， 并删除nextCurNav
                sessionStorage.setItem("nextCurNav", to.name);
                sessionStorage.setItem("curNav", from.name);
            }
            next({
                name: "login",
                query: {
                    to: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});

export default router;
