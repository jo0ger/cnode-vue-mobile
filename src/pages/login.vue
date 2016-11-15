<template lang="html">
    <div id="container">
        <header class="login-title">
            <mu-appbar :title="title">
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBack" />
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
                <mu-checkbox name="auto" nativeValue="自动登录" label="自动登录" v-model="autoLogin"/> <br/>
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
            to: "",
            token: "",
            autoLogin: true
        };
    },
    mounted() {
        let to = this.$route.query.to || "";
        this.to = to;
    },
    methods: {
        login (){
            let token = this.token.trim();
            if(!token){
                this.$message({
                    message: "请输入token"
                }).show();
                return;
            }
            //for example: e8a451a0-01df-41c9-8b4b-51516e3f3648
            this.$http.post("https://cnodejs.org/api/v1/accesstoken", {
                accesstoken: token
            }).then((res) => {
                let data = res.body;
                if(!data || !data.success){
                    this.errorHandle();
                    return;
                }
                this.renderData(data);
            }, (err) => {
                this.errorHandle();
            });
        },
        renderData (data){
            let user = {
                id: data.id,
                loginname: data.loginname,
                avatar: data.avatar_url,
                accesstoken: this.token,
                score: 0,
                message: 0
            };
            if(this.autoLogin){
                //由于vuex在页面刷新时会把state清空（什么鬼呀）
                //所以此处得把user信息存入localStorage
                Object.keys(user).forEach(v => {
                    localStorage[v] = user[v];
                });
            }
            this.$store.dispatch("setUserInfo", user).then(() => {
                let self = this;
                self.$message({
                    message: "登录成功",
                    onClose() {
                        let to = self.to;
                        if(to){
                            let nextCurNav = sessionStorage.getItem("nextCurNav");
                            if(nextCurNav){
                                sessionStorage.setItem("curNav", nextCurNav);
                                sessionStorage.removeItem("nextCurNav");
                            }
                            self.$router.replace(to);
                        }
                    }
                }).show();
            });
        },
        goBack (){
            let nextCurNav = sessionStorage.getItem("nextCurNav");
            if(nextCurNav){
                sessionStorage.removeItem("nextCurNav");
            }
            this.$router.back();
        },
        errorHandle (){
            this.$message({
                message: "登录出错"
            }).show();
        }
    }
}
</script>

<style lang="css" scoped>
.login-btn{
    margin-top: 10px;
}
</style>
