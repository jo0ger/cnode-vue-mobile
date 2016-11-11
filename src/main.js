"use strict"

import Vue from 'vue'
import VueResource from "vue-resource"
import App from './App.vue'
import MuseUI from 'muse-ui'
import "../node_modules/muse-ui/dist/muse-ui.css"
import router from './router'
// import store from './store'

Vue.use(VueResource);
Vue.use(MuseUI);

new Vue({
    router,
    // store,
  render: h => h(App)
}).$mount("#app");
