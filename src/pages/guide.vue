<template lang="html">
    <img src="../assets/logo.png" alt="" />
</template>

<script>
export default {
    name: "guide",
    data() {
        return {}
    },
    computed: {},
    mounted() {
        setTimeout(function () {
            this.$router.push({
                name: "home",
                query: {
                    tab: "all"
                }
            })
        }.bind(this), 500);
    },
    methods: {},
    components: {}
}
</script>

<style lang="css">
</style>
