<template lang="html">
    <div id="container">
        <main class="me-container">
            <mu-list>
                <mu-list-item disabled title="通知与信息设置" describeText="总是中断"/>
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
            <div class="logout">
                <mu-raised-button label="退出登录" fullWidth primary class="logout-btn"/>
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
