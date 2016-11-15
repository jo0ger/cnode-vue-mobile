<template lang="html">
    <div id="container">
        <main class="me-container">
            <mu-list>
                <mu-list-item :title="user.loginname" :disableRipple="!isLogin" @click="goUser">
                  <mu-avatar :icon="!isLogin && 'face' || ''" :src="user.avatar" slot="leftAvatar"/>
                  <mu-raised-button label="登录" class="loginBtn" v-if="!isLogin" @click="goLogin" fullWidth/>
                  <mu-icon value="keyboard_arrow_right" slot="right" v-if="isLogin"></mu-icon>
                </mu-list-item>
            </mu-list>
            <mu-divider />
            <mu-list>
                <mu-sub-header>设置</mu-sub-header>
                <mu-list-item disabledRipple @click="handleToggle('saveFlow')" title="省流模式">
                    <mu-switch v-model="saveFlow"  slot="right"/>
                </mu-list-item>
                <mu-list-item disabledRipple @click="handleToggle('summary')" title="显示摘要">
                    <mu-switch v-model="summary" slot="right"/>
                </mu-list-item>
            </mu-list>
            <mu-list>
                <mu-sub-header>主题换肤</mu-sub-header>
                <mu-list-item disabledRipple @click="handleThemeSelect('default_')"  title="默认">
                    <mu-radio name="group" nativeValue="default_" v-model="theme" slot="right" @change="changeTheme"/>
                </mu-list-item>
                <mu-list-item disabledRipple @click="handleThemeSelect('dark')"  title="夜间">
                    <mu-radio name="group" nativeValue="dark" v-model="theme" slot="right" @change="changeTheme"/>
                </mu-list-item>
                <mu-list-item disabledRipple @click="handleThemeSelect('carbon')"  title="Carbon">
                    <mu-radio name="group" nativeValue="carbon" v-model="theme" slot="right" @change="changeTheme"/>
                </mu-list-item>
                <mu-list-item disabledRipple @click="handleThemeSelect('teal')" title="Teal">
                    <mu-radio name="group" nativeValue="teal" v-model="theme" slot="right" @change="changeTheme"/>
                </mu-list-item>
            </mu-list>
            <mu-divider />
            <mu-list>
                <mu-list-item disabledRipple @click="goAbout" title="关于">
                    <mu-icon value="keyboard_arrow_right" slot="right"></mu-icon>
                </mu-list-item>
            </mu-list>
            <mu-divider />
            <div class="logout">
                <mu-raised-button label="退出登录" @click="logout" v-if="user.loginname" fullWidth primary class="logout-btn"/>
            </div>
        </main>
    </div>
</template>

<script>
"use strict";
import default_ from '!raw!muse-ui/dist/theme-default.css'
import dark from '!raw!muse-ui/dist/theme-dark.css'
import teal from '!raw!muse-ui/dist/theme-teal.css'
import carbon from '!raw!muse-ui/dist/theme-carbon.css'

export default {
    name: "me",
    data() {
        let themes = this.$store.getters.getSetup.themes;
        return {
            theme: "default_",
            themes: {
                default_: {
                    data: default_,
                    use: themes.default_
                },
                dark: {
                    data: dark,
                    use: themes.dark
                },
                carbon: {
                    data: carbon,
                    use: themes.carbon
                },
                teal: {
                    data: teal,
                    use: themes.teal
                }
            },
            saveFlow: false,
            summary: false
        }
    },
    computed: {
        user (){
            return this.$store.getters.getUserInfo;
        },
        isLogin (){
            return this.user.loginname != "";
        }
    },
    mounted() {
        let themes = this.$store.getters.getSetup.themes;
        Object.keys(themes).forEach((v, i) => {
            if (themes[v]) {
                this.theme = v;
                return true;
            }
        });
    },
    methods: {
        goLogin (){
            this.$router.push({
                name: "login",
                query: {
                    to: this.$route.fullPath
                }
            })
        },
        goUser (){
            let name = this.user.loginname;
            if(!name){
                return;
            }
            this.$router.push({
                name: "user",
                params: {
                    name: name
                }
            });
        },
        handleToggle(key) {
            this[key] = !this[key]
        },
        handleThemeSelect(key) {
            this.themes[this.theme].use = !this.themes[this.theme].use;
            this.theme = key;
            this.themes[key].use = !this.themes[key].use;
        },
        changeTheme(theme) {
            const styleEl = this.getThemeStyle();
            styleEl.innerHTML = this.themes[this.theme].data || '';
            this.renderData();
        },
        getThemeStyle() {
            const themeId = 'muse-theme';
            let styleEl = document.getElementById(themeId);
            if (styleEl) return styleEl;
            styleEl = document.createElement('style');
            styleEl.id = themeId;
            document.body.appendChild(styleEl);
            return styleEl;
        },
        renderData() {
            let curThemes = this.themes,
                themes = {
                    "default_": curThemes.default_.use,
                    "carbon": curThemes.carbon.use,
                    "teal": curThemes.teal.use,
                    "dark": curThemes.dark.use
                };

            this.$store.commit("setSetupValue", {
                key: "themes",
                value: themes
            });
        },
        goAbout (){
            this.$router.push({
                name: "about"
            });
        },
        //退出
        logout() {
            let self = this;
            //先移除locastorage里的用户信息
            Object.keys(self.user).forEach(v => {
                localStorage.removeItem(v);
            });
            self.$store.dispatch("clearUserInfo").then(() => {
                this.$message({
                    message: "退出成功",
                    onClose() {
                        if (self.$route.matched.some(record => record.meta.requiresAuth)) {
                            //如果此时路由有登录权限控制，则退出后返回到首页
                            self.$router.push({
                                name: "index",
                                query: {
                                    tab: "all"
                                }
                            });
                        }
                        // else{
                        //     //否则刷新当前页面
                        //     window.location.reload();
                        // }
                    }
                }).show();
            });
        }
    },
    components: {}
}
</script>

<style lang="css" scoped>
#container{
    padding-bottom: 57px;
}
.logout{
    padding: 10px 10px;
}
</style>
