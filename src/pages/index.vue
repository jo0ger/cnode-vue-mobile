<template lang="html">
    <div id="container">
        <router-view></router-view>
        <footer id="footer">
            <mu-divider />
            <mu-bottom-nav :value="curNav" @change="handleChange">
                <mu-bottom-nav-item value="home" title="首页" icon="home"/>
                <mu-bottom-nav-item value="message" title="消息" icon="message"/>
                <mu-bottom-nav-item value="setup" :title="title[curTitle].setup" icon="supervisor_account"/>
            </mu-bottom-nav>
            <mu-badge :content="user.message > 99 && '99+' || user.message" class="message-badge" circle color="red" v-if="user.message > 0"></mu-badge>
        </footer>
    </div>
</template>

<script>
"use strict";

export default {
    name: "cvm-index",
    data() {
        return {
            curNav: sessionStorage.getItem("curNav") || 'home',
            homeTab: "all",
            title: {
                noAccessTitle: {
                    setup: "未登录"
                },
                accessTitle: {
                    setup: "我的"
                }
            },
            messageColor: "red"
        }
    },
    computed: {
        user (){
            return this.$store.getters.getUserInfo;
        },
        isLogin (){
            return this.user.loginname != "";
        },
        curTitle (){
            return this.isLogin && "accessTitle" || "noAccessTitle";
        }
    },
    watch: {
        "$route" (to, from){
            if (from.name === "home") {
                this.homeTab = from.query.tab;
            }
        }
    },
    methods: {
        handleChange(val) {
            if(!val){
                val = "home";
            }
            this.curNav = val;
            sessionStorage.setItem("curNav", val);
            if(val === "home"){
                this.$router.push({
                    name: val,
                    query: {
                        tab: this.homeTab || "all"
                    }
                })
            }else {
                this.$router.push({
                    name: val
                })
            }
        }
    }
}
</script>

<style lang="css">
#footer{
    position: fixed;
    width: 100%;
    bottom: 0;
}
.message-badge{
    position: absolute;
    top: 1px;
    left: 51%;
}
</style>
