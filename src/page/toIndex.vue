<template>
  <div class="login-container"  >
<!--    <span>123</span>-->
  </div>
<!--  <div>-->
<!--    <avue-login :option="option" @submit="submit"></avue-login>-->
<!--  </div>-->
</template>
<script>


export default {
  data() {
    return {
      option: {
      },
    }
  },
  mounted() {
    this.toIndex()
  },
  methods: {
    toIndex() {
      let protocol = window.location.protocol;
      let url = window.location.host;
      window.location.href = protocol + "//" + url + "/view/1414539666304020482"


      // this.$message.success(JSON.stringify(form))
      // console.log(form);
    }
  },
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>
