<template lang="html">
    <section id="main">
        <header id="main-header">
            <mu-tabs :value="curTab" @change="handleTabChange">
                <mu-tab value="all" title="全部"/>
                <mu-tab value="good" title="精华"/>
                <mu-tab value="share" title="分享"/>
                <mu-tab value="ask" title="问答"/>
                <mu-tab value="job" title="招聘"/>
            </mu-tabs>
        </header>
        <main id="main-content">
            <section class="topics-container">
            </section>
        </main>
    </section>
</template>

<script>
"use strict";

export default {
    name: "home",
    data() {
        let initTab = "all";
        return {
            curTab: initTab,
            queryData: {
                page: 1,
                tab: initTab,
                limit: 20,
                mdrender: true
            }
        };
    },
    created () {
        this.curTab = this.$route.query.tab;
    },
    watch: {
        "curTab" (){
            this.fetch();
        }
    },
    methods: {
        handleTabChange (val){
            if(!val){
                val = "all";
            }
            this.curTab = val;
            this.$router.push({
                name: this.$route.name,
                query: {
                    tab: val
                }
            })
        },
        fetch (){
            this.$http.get("https://cnodejs.org/api/v1/topics", {
                params: this.queryData
            }).then((res) => {
                    console.log(res);
                }, (err) => {
                    //error 处理
                }
            );
        }
    }
};
</script>

<style lang="css">
</style>
