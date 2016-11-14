<template lang="html">
    <div id="container">
        <router-view></router-view>
        <footer id="footer">
            <mu-bottom-nav :value="curNav" @change="handleChange">
                <mu-bottom-nav-item value="home" title="首页" icon="home"/>
                <mu-bottom-nav-item value="message" title="消息" icon="message"/>
                <mu-bottom-nav-item value="me" :title="title[curTitle].me" icon="supervisor_account"/>
            </mu-bottom-nav>
        </footer>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            curNav: 'home',
            homeTab: "all",
            curTitle: "noAccessTitle",
            title: {
                noAccessTitle: {
                    me: "未登录"
                },
                accessTitle: {
                    me: "我的"
                }
            }
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
    border-top: 1px solid #eee;
}
</style>
