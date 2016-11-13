"use strict"

import Vue from 'vue'
import VueResource from "vue-resource"
import App from './App.vue'
import MuseUI from 'muse-ui'
import "muse-ui/dist/muse-ui.css"
import 'muse-ui/dist/theme-carbon.css'
import router from './router'
import store from './store'
import filters from './filter'

Vue.use(VueResource);
Vue.use(MuseUI);

Object.keys(filters).forEach((v, i) => {
    Vue.filter(v, filters[v]);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
