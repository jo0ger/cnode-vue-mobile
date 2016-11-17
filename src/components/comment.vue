<template lang="html">
    <mu-list>
        <mu-list-item :title="reply.author.loginname" v-for="reply in replies" :describeLine="9999999">
          <mu-avatar :src="reply.author.avatar_url" slot="leftAvatar"/>
          <span slot="after">{{reply.create_at | getDateFromNow}}</span>
          <main class="markdown-body reply-content" slot="describe" v-html="reply.content"></main>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作" v-if="user.id">
            <mu-menu-item :title="(reply.isUp && '已' || '') + '顶'"
                :afterText="reply.ups.length+''"
                @click="replyUp(reply)"
                :disabled="reply.author.loginname === user.loginname"/>
            <mu-divider />
            <mu-menu-item title="回复" @click="addReply(reply.id, reply.author.loginname)">
            </mu-menu-item>
          </mu-icon-menu>
        </mu-list-item>
    </mu-list>
</template>

<script>
"use strict";
import {
    mapGetters
} from "vuex";
import Emitter from "../mixin/emitter";

export default {
    name: "cvm-comment",
    mixins: [Emitter],
    data (){
        return {
            upLock: false,
            replyLock: false
        };
    },
    props: {
        replies: {
            require: true,
            default: function() {
                return [];
            },
            type: Array
        }
    },
    computed: mapGetters({
        user: "getUserInfo"
    }),
    watch: {
        //这里不能在created中赋值，因为模板判定的时候replies中还不存在isUp，也就未跟踪到
        replies (){
            let self = this;
            this.replies.forEach(function(v, i) {
                self.$set(v, "isUp", self.checkIsUp(v.ups))
            });
        }
    },
    methods: {
        replyUp(reply) {
            if(this.upLock){
                this.errorHandle("请勿频繁操作", "warn");
                return;
            }
            this.upLock = true;
            let self = this;
            this.$http.post("https://cnodejs.org/api/v1/reply/" + reply.id + "/ups", {
                accesstoken: self.user.accesstoken
            }).then(res => {
                this.upLock = false;
                let body = res.body;
                if (!body || !body.success) {
                    this.errorHandle();
                    return;
                }
                if(body.action == "up"){
                    reply.ups.push(self.user.id);
                    reply.isUp = true;
                }else {
                    reply.ups.splice(reply.ups.indexOf(self.user.id), 1);
                    reply.isUp = false;
                }
            }, err => {
                this.upLock = false;
                this.errorHandle("err:" + err.statusText);
            });
        },
        addReply(replyId, replyAuthorName) {
            if(!replyId || !replyAuthorName){
                this.errorHandle();
                return;
            }
            this.dispatch("cvm-topic", "addReply", {
                replyId: replyId,
                replyAuthorName: "@" + replyAuthorName + " "
            })
        },
        errorHandle(msg, type) {
            this.$message({
                message: msg || "操作失败",
                type: type || "error"
            }).show();
        },
        //检查评论是否被赞过
        checkIsUp(ups) {
            let result = "",
                self = this;
            result = ups.find((v) => {
                if (v === self.user.id) {
                    return true;
                }
            });
            return result && true || false;
        }
    },
    components: {}
}
</script>

<style lang="css">
.reply-content{
    color: rgba(0, 0, 0, 0.54);
}
</style>
