<template lang="html">
    <transition name="cvm-message-fade">
        <div class="cvm-message" v-show="show">
            <i class="material-icons cvm-message-icon" v-if="icon">{{ icon }}</i>
            <span class="cvm-message-text">{{ message }}</span>
        </div>
    </transition>
</template>

<script>
"use strict";

export default {
    name: "message",
    data() {
        return {
            show: false,
            message: "操作成功",
            icon: "done",
            duration: 2500,
            onClose: function (){}
        }
    },
    mounted() {
        this.startTimer();
    },
    methods: {
        startTimer() {
            if (this.duration > 0) {
                setTimeout(function() {
                    this.close();
                }.bind(this), this.duration);
            }
        },
        close() {
            this.$el.addEventListener("transitionend", this.destroy)
            this.show = false;
            let onClose = this.onClose;
            if(onClose && typeof onClose === "function"){
                onClose();
            }
        },
        destroy() {
            this.$el.parentNode.removeChild(this.$el);
            this.$destroy();
        }
    }
}
</script>

<style lang="css" scoped>
.cvm-message{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 80%;
    text-align: center;
    transition: all .25s linear;
}
.cvm-message-fade-enter,.cvm-message-fade-leave-active{
    opacity:0;
}
.cvm-message-icon{
    display: block;
    text-align: center;
    font-size: 48px;
}
.cvm-message-text{
    font-size: 14px;
    display: block;
    text-align: 14px;
}
</style>
