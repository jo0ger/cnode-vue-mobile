<template lang="html">
    <cvm-main-container>
        <div id="container">
            <mu-list>
                <mu-list-item :title="topic.title">
                    <mu-avatar :src="topic.author.avatar_url" slot="leftAvatar" class="topic=author-avatar"/>
                    <div slot="describe">
                        <p>
                            <span v-text="topic.author.loginname" class="topic-info topic-author-name"></span>
                            <span  class="topic-info topic-time right">{{ topic.create_at | getDateFromNow }}</span>
                        </p>
                        <p>
                            <span :title="getTopicType(topic.tab)" v-if="topic.tab" class="topic-info topic-type">来自</span>
                            <span v-text="topic.visit_count + '次浏览'" class="topic-info topic-visit right" v-if="topic.visit_count"></span>
                        </p>
                    </div>
                    <!-- <mu-checkbox slot="right"
                        :value="topic.is_collect"
                        class="topic-collect"
                        uncheckIcon="star_border"
                        v-if="user.id"
                        checkedIcon="star"
                        @input="topicCollect"/> <br/> -->
                    <mu-icon-button slot="right" :icon="collectBtn[collectBtn.type]" touch v-if="user.id" @click="topicCollect"></mu-icon-button>
                </mu-list-item>
                <mu-divider/>
            </mu-list>
            <mu-content-block  v-if="topic.content" class="markdown-body topic-content" v-html="topic.content"></mu-content-block>
        </div>
        <mu-popup position="right" class="comment-panel" v-show="commentPanel" :overlay="false">
            <cvm-appbar-container icon="close" :title="'评论 ' + topic.reply_count" :goBack="toggleCommentPanel">
                <cvm-comment :replies="topic.replies"></cvm-comment>
                <div class="topic-reply-container" slot="footer" v-if="user.id">
                    <mu-divider />
                    <div class="topic-reply">
                        <mu-text-field hintText="支持markdown语法" v-model="replyContent" id="reply" icon="comment" fullWidth multiLine/>
                    </div>
                    <mu-flat-button label="提交" class="reply-btn" @click="reply"/>
                </div>
            </cvm-appbar-container>
        </mu-popup>
        <button type="button" name="comment-btn" class="comment-btn mu-float-button" slot="bottom-right" @click="toggleCommentPanel">
            <i class="material-icons comment-icon">comment</i>
            <span v-text="topic.reply_count"></span>
        </button>

    </cvm-main-container>
</template>

<script>
"use strict";
import cvmMainContainer from "../components/main-container.vue";
import cvmAppbarContainer from "../components/appbar-container.vue";
import cvmComment from "../components/comment.vue";
import Emitter from "../mixin/emitter";
import Markdown from "markdown";
import tool from "../tool";

let markdown = Markdown.markdown;

export default {
    name: "cvm-topic",
    mixins: [Emitter],
    data() {
        return {
            topic: {
                id: this.$route.params.id,
                author: {

                }
            },
            commentPanel: false,
            replyContent: "",
            replyId: "",
            tagText: '<br/><br/><a class="tag" target="new" href="https://github.com/BubblyPoker/cnode-vue-mobile">来自 cnode-vue-mobile</a>',
            replyLock: false,
            collectBtn: {
                type: "off",
                on: "star",
                off: "star_border",
                lock: false, //防止用户多次点击
            },
            collectLock: false
        };
    },
    computed: {
        user (){
            return this.$store.getters.getUserInfo;
        }
    },
    created() {
        this.fetch();
        this.$on("addReply", function(params) {
            let replyAuthorName = params.replyAuthorName;
            this.replyContent = replyAuthorName;
            this.replyId = params.replyId;
            //自动获取焦点
            document.getElementById("reply").querySelector("textarea").focus();
        });
    },
    beforeDestory() {
        this.$off("addReply");
    },
    methods: {
        fetch() {
            let url = "https://cnodejs.org/api/v1/topic/" + this.topic.id,
                self = this;
            this.$http.get(url, {
                params: {
                    accesstoken: self.user.accesstoken
                }
            }).then(res => {
                let body = res.body;
                if (!body || !body.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                self.topic = body.data || self.topic;
                // self.topic.typeClass = this.getTypeClass(self.topic.top, self.topic.good, self.topic.tab)
                if (self.topic.is_collect) {
                    self.collectBtn.type = "on";
                }
            }, err => {

            })
        },
        toggleCommentPanel() {
            this.commentPanel = !this.commentPanel;
        },
        getTopicType(tab) {
            if (!tab) {
                return "";
            }
            let result = "";
            switch (tab) {
                case "share":
                    result = "分享";
                    break;
                case "ask":
                    result = "问答";
                    break;
                case "job":
                    result = "招聘";
                    break;
                default:
                    break;
            }
            return result;
        },
        topicCollect() {
            if (this.collectLock) {
                this.errorHandle("请勿频繁操作", "warn");
                return;
            }
            let self = this,
                isCollected = this.topic.is_collect,
                url = "https://cnodejs.org/api/v1/topic_collect/";
            url += (isCollected && "de_collect" || "collect");

            this.collectLock = true;
            this.$http.post(url, {
                topic_id: self.topic.id,
                accesstoken: self.user.accesstoken
            }).then(res => {
                this.collectLock = false;
                let body = res.body;
                if (!body || !body.success) {
                    this.errorHandle();
                    return;
                }
                self.$message().show();
                self.topic.is_collect = !isCollected;
                self.collectBtn.type = isCollected && "off" || "on";
            }, err => {
                this.collectLock = false;
                this.errorHandle("err:" + err.statusText);
            });
        },
        reply (){
            if (!this.replyContent) {
                this.$message({
                    message: "请输入评论",
                    type: "warn",
                    onClose (){
                        document.getElementById("reply").querySelector("textarea").focus();
                    }
                }).show();
                return;
            }
            if(this.replyLock){
                this.errorHandle("请勿频繁操作", "warn");
                return;
            }
            this.replyLock = true;
            let self = this,
                linkUsers = tool.linkUsers(this.replyContent),
                htmlText = markdown.toHTML(linkUsers) + self.tagText,
                rendered_reply_content = $('<div class="markdown-text"></div>').append(htmlText)[0].outerHTML,
                post_date = new Date(),
                post_data = {
                    accesstoken: self.user.accesstoken,
                    content: this.replyContent + self.tagText,
                };
            if (self.replyId) {
                post_data.reply_id = self.replyId;
            }
            this.$http.post(
                "https://cnodejs.org/api/v1/topic/" + self.topic.id + "/replies",
                post_data
            ).then(res => {
                this.replyLock = false;
                res = res.body;
                console.log(res);
                if (!res || !res.success) {
                    self.errorHandle();
                    return;
                }
                this.$message({
                    message: "评论成功"
                }).show();
                self.topic.replies.push({
                    id: res.reply_id,
                    author: {
                        loginname: self.user.loginname,
                        avatar_url: self.user.avatar
                    },
                    content: rendered_reply_content,
                    ups: [],
                    create_at: post_date
                });
                self.topic.reply_count ++;
                this.replyContent = "";
            }, err => {
                this.replyLock = false;
                self.errorHandle();
            });
        },
        errorHandle(msg, type) {
            this.$message({
                message: msg || "操作失败",
                type: type || "error"
            }).show();
        },
    },
    components: {
        cvmMainContainer,
        cvmAppbarContainer,
        cvmComment
    }
}
</script>

<style lang="css">
.right{
    float: right;
}
.topic-info{
    font-size: 12px;
}
.topic-info:after{
    content: attr(title);
    margin-left: 5px;
}
.comment-btn{
    height: 40px;
    width: 40px;
    user-select: none;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
}
.comment-icon{
    font-size: 12px;
    vertical-align: middle;
}
.comment-panel{
    width: 100%;
    height: 100%;
}
.topic-reply-container{
    display: flex;
}
.topic-reply{
    flex: 1 0 75%;
}
.reply-btn{
    flex: 1 0 20%;
}
</style>
