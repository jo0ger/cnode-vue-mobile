<template lang="html">
    <div id="container">
        <main>
            <slot></slot>
        </main>
        <div class="bottom bottom-left">
            <mu-float-button icon="arrow_back" mini class="back-btn" :backgroundColor="baseBackgroundColor" @click="goBackDefault"/>
        </div>
        <div class="bottom bottom-right">
            <slot name="bottom-right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "cvm-main-container",
  data () {
    return {
        baseBackgroundColor: "lightBlack"
    }
  },
  props: {
      goBack: {
          require: false,
          default: function(){},
          type: Function
      }
  },
  computed: {},
  mounted () {},
  methods: {
      goBackDefault (){
          this.goBack.call(this);
          this.$router.back();
      }
  },
  components: {}
}
</script>

<style lang="css">
.bottom{
    position: fixed;
    bottom: 20px;
    height: 40px;
    width: 40px;
}
.bottom-left{
    left: 20px;
}
.bottom-right{
    right: 20px;
}
</style>
