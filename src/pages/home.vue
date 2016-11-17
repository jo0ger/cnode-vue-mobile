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
            <cv-list class="topic-list" :list="curList" :refreshing="refreshing" :loadmoring="loadmoring" :refresh="refresh" :loadMore="loadMore"></cv-list>
        </main>
        <mu-float-button icon="mode_edit" id="new-topic" @click="newTopic" mini/>
    </section>
</template>

<script>
"use strict";

import cvList from "../components/list.vue"

export default {
    name: "cvm-home",
    data() {
        return {
            curTab: "",
            curList: [],
            refreshing: false,
            loadmoring: false
        };
    },
    computed: {
        list (){
            return this.$store.getters.getList;
        },
        curList (){
            return this.list[this.curTab].data;
        }
    },
    created () {
        this.curTab = this.$route.query.tab || "";
    },
    watch: {
        "curTab" (to, from){
            let nextList = this.list[this.curTab].data,
                topic_container = document.getElementById('topics-container'),
                lastScrollTop = topic_container.scrollTop || 0;
            if(from){
                this.$store.commit("setListValue", {
                    tab: from,
                    list: {
                        scrollTop: lastScrollTop
                    }
                })
            }

            if(to){
                $(topic_container).scrollTop(this.list[this.curTab].scrollTop || 0);
            }

            if(!nextList || !nextList.length){
                this.loadMore();
            }
        }
    },
    mounted (){
        let topic_container = document.getElementById('topics-container');
        $(topic_container).scrollTop(this.list[this.curTab].scrollTop || 0);
    },
    beforeRouteLeave (to, from, next){
        let topic_container = document.getElementById('topics-container'),
            lastScrollTop = topic_container.scrollTop || 0;
        if(from){
            this.$store.commit("setListValue", {
                tab: from.query.tab,
                list: {
                    scrollTop: lastScrollTop
                }
            })
        }
        next();
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
        fetch (refresh){
            this.$http.get("https://cnodejs.org/api/v1/topics", {
                params: this.list[this.curTab].queryData
            }).then((res) => {
                let data = res && res.body;
                if (!data || !data.success) {
                    //TODO 错误抛出
                    return;
                }
                this.refreshing = false;
                this.loadmoring = false;
                if (refresh) {
                    this.$store.commit("setListValue", {
                        tab: this.curTab,
                        list: {
                            data: data.data,
                            queryData: {
                                page: 1,
                                limit: 20,
                                tab: this.curTab
                            },
                        }
                    });
                }else {
                    this.$store.commit("setListValue", {
                        tab: this.curTab,
                        list: {
                            data: this.curList.concat(data.data),
                            queryData: {
                                page: this.list[this.curTab].queryData.page ++,
                                limit: 20,
                                tab: this.curTab
                            },
                        }
                    });
                }
            }, (err) => {
                //error 处理
            });
        },
        refresh (){
            this.refreshing = true;
            this.list[this.curTab].queryData.page = 1;
            this.fetch(true);

        },
        loadMore (){
            this.loadmoring = true;
            this.list[this.curTab].queryData.page ++;
            this.fetch(false);
        },
        newTopic (){
            this.$router.push({
                name: "newTopic"
            })
        }
    },
    components: {
        cvList
    }
};
</script>

<style lang="css" scoped>
#main-header{
    position: fixed;
    width: 100%;
    z-index: 99;
}
#main-content{
    padding-bottom: 57px;
    padding-top: 48px;
    position: absolute;
    width: 100%;
    height: 100%;
}
#new-topic{
    position: fixed;
    bottom: 72px;
    right: 15px;
}
</style>
