<template lang="html">
    <mu-list-item  class="topic-item" @click.stop.prevent="click" :disableRipple="!ripple">
        <h3 :class="['topic-title', getTypeClass(item.top, item.good, item.tab)]" :title="getArticleType(item.top, item.good, item.tab)" v-text="item.title"></h3>
        <div class="topic-main">
            <mu-avatar v-if="!saveFlow" class="topic-author-avatar" :src="item.author.avatar_url" @click.native.stop.prevent="avatarClick($event)"/>
            <div class="topic-content">
                <p v-if="!saveFlow">
                    <span class="topic-author-name" v-text="item.author.loginname"></span>
                </p>
                <p>
                    <span v-if="saveFlow" class="topic-author-name">{{item.author.loginname}}发布于</span>
                    <time class="topic-time">{{ item.create_at | getDateFromNow }}</time>
                    <section class="topic-count">
                        <span class="topic-comment"><i class="material-icons">question_answer</i>{{item.reply_count}}</span>
                        <span class="topic-visit"><i class="material-icons">visibility</i>{{item.visit_count}}</span>
                    </section>
                </p>
            </div>
        </div>
    </mu-list-item>
</template>

<script>
export default {
    name: "cvm-topic-item",
    data (){
        return {
            saveFlow: this.$store.getters.getSetup.saveFlow
        }
    },
    props: {
        item: {
            require: true,
            default: {},
            type: Object
        },
        click: {
            require: false,
            default (){},
            type: Function
        },
        avatarClick: {
            require: false,
            default (){},
            type: Function
        },
        ripple: {
            require: false,
            default: false,
            type: Boolean
        }
    },
    methods: {
        getTypeClass(top, good, tab) {
            if (top) {
                return "top";
            } else if (good) {
                return "good";
            } else if (tab == "ask") {
                return "ask";
            } else if (tab == "job") {
                return "job";
            } else if (tab == "share") {
                return "share";
            } else if (!top && !good && !tab || (this.$route.query.tab === tab)) {
                return "hidden";
            } else {
                return "";
            }
        },
        getArticleType (top, good, tab) {
          if(top){
            return "置顶";
          }else if(good){
            return "精华";
          }else if(tab === "ask"){
            return "问答";
          }else if(tab === "share"){
            return "分享";
          }else if(tab === "job"){
            return "招聘";
          }else{
            return "";
          }
        }
    }
}
</script>

<style lang="css" scoped>
.topic-item{
    padding: 0;
}
.topic-title{
    color: #2c3e50;
    font-size: 16px;
    line-height: 1.5;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.topic-title::before{
    content: attr(title);
    position: relative;
    background-color: #f44336;
    color: #fff;
    padding: 5px 6px;
    font-size: 12px;
    font-weight: 400;
    margin-right: 10px;
}
.topic-title.good::before{
    background-color: #ff6d00;
}
.topic-title.share::before{
    background-color: #2196f3;
}
.topic-title.ask::before{
    background-color: #9c27b0;
}
.topic-title.job::before{
    background-color: #00bfa5;
}
.topic-author-avatar{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #F3F3F3;
    margin-right: 10px;
}
.topic-main{
    display: flex;
    padding-top: 10px;
}
.topic-content{
    flex: 1;
}
.topic-content > p{
    font-size: 12px;
    color: #34495e;
    padding: 3px 0;
}
.topic-content > p:last-child{
}
.topic-content span, .topic-content time{
    color: rgba(0, 0, 0, 0.7);
}
.topic-count{
    position: relative;
    float: right;
    right: 10px;
}
.topic-count span{
    flex: 1;
    text-align: center;
    margin-left: 10px;
}
.topic-count span i{
    font-size: 12px;
    vertical-align: middle;
    margin-right: 5px;
}
</style>
