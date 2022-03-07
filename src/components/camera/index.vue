<template>
  <div>
    <img :src="url" alt="" @click="open()" width="100%" height="100%"/>
    <Modal v-model="dialogVisible" :title="title" :mask-closable="false" draggable="true"
           :mask="false" :footer-hide="true" width="900" @on-cancel="cancel">
      <img :src="base" alt="">
      <img style="margin-left: 40%" src="./loading.gif" v-if="base== null" alt="">

    </Modal>
  </div>
</template>
<script>
export default {
  name: 'camera',
  props: {
    option: Object,
    component: Object
  },
  data() {
    return {
      socket: null,
      base: null,
      timer: null,
      dialogVisible: false,
    }
  },
  computed: {
    url() {
      return (this.option.url)
    },
    title() {
      return (this.option.title)
    },
  },

  methods: {
    open() {
      this.connection()
      this.dialogVisible = true
    },
    cancel() {
      clearTimeout(this.timer)
      this.timer = null;
      this.socket = null
      console.log("正在关闭Socket")
      this.socket.close()
      this.socket.onclose = function () {
        console.log("Socket已关闭");
      };
    },
    send(){
      console.log("定时获取")
      this.socket.send(JSON.stringify(this.option));
    },
    connection() {

      if (typeof (WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
      } else {
        console.log("您的浏览器支持WebSocket");
        // this.socket = new WebSocket("ws://127.0.0.1:80/chat".replace("http", "ws"));
        this.socket = new WebSocket("ws://10.20.135.252:80/ws/chat".replace("http", "ws"));
        //打开事件
        let th_ = this
        this.socket.onopen = function () {
          th_.socket.send(JSON.stringify(th_.option));
        };

       this.timer = setInterval(this.send, 1000);

        //关闭事件
        // this.socket.onclose = function () {
        //   console.log("Socket已关闭");
        // };

        //获得消息事件
        this.socket.onmessage = function (msg) {
          th_.base = msg.data;

        };

        //发生了错误事件
        this.socket.onerror = function () {
          alert("Socket发生了错误");
          //此时可以尝试刷新页面
        }
      }
    }
  }
}
</script>
<style>
.ivu-modal-content{
  background-color: #091F37FF;
}
.ivu-modal-header p, .ivu-modal-header-inner{
  color: #f5f7fa;
}
.demo-spin-icon-load{
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
.demo-spin-col{
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
