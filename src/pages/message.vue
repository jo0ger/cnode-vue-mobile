<template lang="html">
    <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="notread" title="未读"/>
        <mu-tab value="hadread" title="已读"/>
    </mu-tabs>
</template>

<script>
export default {
    name: "cvm-message",
    data() {
        return {
            activeTab: "notread"
        }
    },
    computed: {},
    mounted() {},
    methods: {
        handleTabChange (val) {
          this.activeTab = val
        },
    },
    components: {}
}
</script>

<style lang="css">
</style>
