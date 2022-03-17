<template>
  <div class="build views">
    <container :props="props" :option="option" ref="container" :layoutObj='layoutObj' :pageList='pageList'></container>
  </div>
</template>
<script>
import init from '@/mixins/'
import {verToken,getAllData,getVisualApp} from '@/api/visual'

export default {
  data() {
    return {
        layoutObj: {},
        pageList: []
    }
  },
  props: {
    option: Object,
    props: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted() {
    // this.isLogin()
    getVisualApp(this.$route.params.id).then(res => {
      this.layoutObj = JSON.parse(res.data.data.layout)
      this.pageList = res.data.data.visuals
    })
    this.getSiteData()
    setInterval(this.getSiteData, 10000);

  },
  methods: {
    //请求数据存入浏览器缓存中
    getSiteData(){
      getAllData().then(res=>{
        res.data.data.map(i=>{
          localStorage.setItem(i.name,i.value)
        })
      })
    },


    //判断是否登录
    isLogin() {
      let token = localStorage.getItem("zt-token");
      let protocol = window.location.protocol;
      let url = window.location.host;
      localStorage.setItem("next-url", window.location.href)
      // if (token == null) {
      //   window.location.href = protocol + "//" + url + "/login"
      // } else {
      //   //判断token是否过期
      //   let user = JSON.parse(token);
      //   verToken(user.account, user.token).then(res => {
      //     console.log(res.data.data)
      //     if (!res.data.data) {
      //       window.location.href = protocol + "//" + url + "/login"
      //     }
      //   })
      // }

    }
  },
  mixins: [init],
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>
