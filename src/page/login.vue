<template>
  <div class="login-container">


    <div style="margin-left: 35%">
      <h2 style="color: #FFFFFF;margin-left: 50%">登 录</h2>
      <avue-login :option="option" @submit="submit"></avue-login>
    </div>


  </div>
  <!--  <div>-->
  <!--    <avue-login :option="option" @submit="submit"></avue-login>-->
  <!--  </div>-->
</template>
<script>
import {md5} from '../utils/md5.js'
import {
  login
} from '@/api/visual'

export default {
  data() {
    return {
      option: {
        width: 400,
        time: 60,
        codeType: 'phone',
        column: {
          username: {
            // hide: true,
            label: '用户名',
            // prop: 'user',
            // placeholder:'',
            autocomplete: 'off',
            rules: {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          },
          password: {
            label: '密码',
            // prop: 'pass',
            // placeholder:'',
            autocomplete: 'off',
            rules: {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          },
          code: {
            hide: true
          }
        }
      },
    }
  },
  mounted() {

  },
  methods: {
    submit(form) {
      form.password = md5(form.password)
      // form.account = form.username
      login(form).then(res => {

        if (res.data.error_code === 400) {
          this.$message.error("用户名或密码不正确")
        } else {
          this.$message.success("登录成功")
          localStorage.setItem('zt-token', JSON.stringify(res.data.access_token));
          if(localStorage.getItem('next-url')){
              window.location.href = localStorage.getItem('next-url')
          }else {
              window.location.href = './index'
          }
          // window.location.href = localStorage.getItem('next-url')
        }


      })

      // this.$message.success(JSON.stringify(form))
      // console.log(form);
    }
  },
}
</script>
<style lang="scss">
@import "../styles/style.scss";

.login-container {
  width: 100%;
  height: 100%;
  background: #171b22;
}
</style>
