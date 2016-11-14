<template lang="html">
    <div id="container">
        <header class="login-title">
            <mu-appbar :title="title">
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="back"></mu-icon-button>
            </mu-appbar>
        </header>
        <main class="login-container">
            <mu-content-block class="login-content">
                <mu-text-field label="Token令牌"
                    hintText="请输入Token"
                    type="text"
                    v-model="token"
                    labelFloat
                    fullWidth></mu-text-field>
                <mu-checkbox name="auto" nativeValue="自动登录" label="自动登录"/> <br/>
                <mu-raised-button :label="title" fullWidth secondary class="login-btn" @click="login"/>
                <mu-raised-button label="扫码登录" fullWidth backgroundColor="#a4c639" class="login-btn"/>
            </mu-content-block>
        </main>
    </div>
</template>

<script>
"use strict";
export default {
    name: "login",
    data() {
        return {
            title: "登录",
            redirect: "",
            token: ""
        };
    },
    computed: {},
    mounted() {
        let red = this.$route.query.redirect || "";
        this.redirect = red;
    },
    methods: {
        login (){
            console.log(this.token);
            this.$message({
                message: "操作成功",
                type: "success",
            }).show();
        },
        back (){
            let red = decodeURIComponent(this.redirect);
            if(red){
                this.$router.replace(red);
            }
        }
    },
    components: {}
}
</script>

<style lang="css" scoped>
.login-btn{
    margin-top: 10px;
}
</style>
