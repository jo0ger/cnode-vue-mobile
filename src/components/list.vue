<template lang="html">
    <div id="topics-container">
        <mu-refresh-control id="refresh" :refreshing="refreshing" :trigger="container" @refresh="refresh"/>
        <mu-list id="topics">
            <template v-for="item in list">
                <cvItem :item="item" :click="goTopic"></cvItem>
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
    name: "topic-list",
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
        goTopic () {
            console.log(111);
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
