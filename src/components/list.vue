<template lang="html">
    <div id="topics-container">
        <mu-refresh-control id="refresh" :refreshing="refreshing" :trigger="container" @refresh="refresh"/>
        <mu-list id="topics">
            <template v-for="item in list">
                <cvItem :item="item" :click="goTopic(item.id)" :avatarClick="goUser(item.author.loginname)"></cvItem>
                <mu-divider/>
            </template>
        </mu-list>
        <mu-infinite-scroll :scroller="container" :loading="loadmoring" @load="loadMore" :loadingText="loadingText"/>
    </div>
</template>

<script>
"use strict"

import cvItem from "../components/item.vue"

export default {
    name: "cvm-topic-list",
    data() {
        return {
            container: null,
            loadingText: "加载中..."
        }
    },
    props: {
        list: {
            require: true,
            default: [],
            type: Array
        },
        refreshing: {
            require: false,
            default: false,
            type: Boolean
        },
        loadmoring: {
            require: false,
            default: false,
            type: Boolean
        },
        refresh: {
            require: false,
            default () {},
            type: Function
        },
        loadMore: {
            require: false,
            default: function() {},
            type: Function
        }
    },
    mounted() {
        this.container = this.$el;
    },
    methods: {
        goTopic (topicId) {
            let self = this;
            return function(){
                if(topicId){
                    self.$router.push({
                        name: "topic",
                        params: {
                            id: topicId
                        }
                    });
                }
            };
        },
        goUser (name){
            let self = this;
            return function(e){
                self.$router.push({
                    name: "user",
                    params: {
                        name: name
                    }
                })
            };
        },
        loadmore() {
            this.loadMore.call(this);
        }
    },
    components: {
        cvItem
    }
}
</script>

<style lang="css" scoped>
#topics-container{
    height: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
}
</style>
