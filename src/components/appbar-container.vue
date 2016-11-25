<template lang="html">
    <div id="container">
        <header class="header">
            <mu-appbar :title="title">
                <mu-icon-button :icon="icon" slot="left" @click="goBack" />
            </mu-appbar>
        </header>
        <main class="main" :style="mainStyle">
            <slot></slot>
        </main>
        <footer class="footer" :style="footerStyle">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
"user strict";

export default {
    name: "cvm-appbar-container",
    props: {
        title: {
            require: false,
            default: "",
            type: String
        },
        icon: {
            require: false,
            default: "keyboard_arrow_left",
            type: String
        },
        goBack: {
            require: false,
            default: function(){},
            type: Function
        }
    },
    computed: {
        mainStyle (){
            return {
                bottom: !this.$slots.footer && '0' || "48px"
            };
        },
        footerStyle() {
            return {
                height: !this.$slots.footer && "0" || "48px"
            };
        }
    },
    mounted (){
        if(!this.$slots.footer){

        }
    }

}
</script>
<style lang="css" scoped>
.main{
    width: 100%;
    position: absolute;
    top: 56px;
    overflow: scroll;
}
.footer{
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;
}
@media (min-width: 480px){
    .main{
        top: 64px;
    }
}
</style>
