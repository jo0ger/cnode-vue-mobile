<template lang="html">
    <div id="container">
        <mu-list>
            <mu-list-item title="这个周末一起吃饭么?">
              <mu-avatar :src="avatar1" slot="leftAvatar"/>
              <span slot="describe">
                <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
              </span>
              <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                <mu-menu-item title="回复" />
                <mu-menu-item title="标记" />
                <mu-menu-item title="删除" />
              </mu-icon-menu>
            </mu-list-item>
            <mu-divider inset/>
        </mu-list>
    </div>
</template>

<script>
"use strict";
import {
    mapGetters
} from "vuex";

export default {
    name: "cvm-topic",
    data() {
        return {
            title: "详情",
            topic: {
                id: this.$route.params.id,
                author: {
                    loginname: ""
                }
            },
        };
    },
    computed: mapGetters({
        user: "getUserInfo"
    }),
    created() {
        this.fetch();
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
                if (!res || !res.success) {
                    //TODO 是否错误抛出  有待商榷
                    return;
                }
                self.topic = res.data || self.topic;
                self.topic.typeClass = this.getTypeClass(self.topic.top, self.topic.good, self.topic.tab)
                if (self.topic.is_collect) {
                    self.collectBtn.type = "on";
                }
            }, err => {

            })
        }
    },
    components: {}
}
</script>

<style lang="css">
</style>
