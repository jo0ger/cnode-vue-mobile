<template lang="html">
    <div id="container">
        <router-view></router-view>
        <footer id="footer">
            <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
                <mu-bottom-nav-item value="home" title="首页" icon="home"/>
                <mu-bottom-nav-item value="message" title="消息" icon="message"/>
                <mu-bottom-nav-item value="me" title="我" icon="account_circle"/>
            </mu-bottom-nav>
        </footer>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            bottomNav: 'home',
        }
    },
    methods: {
        handleChange(val) {
            if(!val){
                val = "home";
            }
            this.bottomNav = val;
            this.$router.push({
                name: val
            })
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
