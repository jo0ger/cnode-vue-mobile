<template lang="html">
    <div id="container">
        <header class="header">
            <mu-appbar :title="title">
                <mu-icon-button icon="keyboard_arrow_left" slot="left" @click="goBackDefault" />
            </mu-appbar>
        </header>
        <main class="main">
            <slot></slot>
        </main>
    </div>
</template>

<script>
export default {
    name: "cvm-container",
    props: {
        title: {
            require: false,
            default: "",
            type: String
        },
        goBack: {
            require: false,
            default: function(){},
            type: Function
        }
    },
    methods: {
        goBackDefault (){
            this.goBack.call(this);
            this.$router.back();
        }
    }
}
</script>
<style lang="css" scoped>
.main{
    width: 100%;
    position: absolute;
    bottom: 56px;
    top: 56px;
    overflow: scroll;
}
@media (min-width: 480px){
    .main{
        top: 64px;
    }
}
</style>
