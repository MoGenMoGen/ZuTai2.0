<!-- 自定义配置 -->
<template>
  <div>


    <el-radio v-model="radio" label="1">常规</el-radio>
    <el-radio v-model="radio" label="2">机器人</el-radio>

    <el-form v-if="radio==='1'" label-width="80px" size="mini">
      <el-form-item label="状态1">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q1"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t1"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/t1.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态2">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q2"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t2"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/t2.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态3">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q3"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t3"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/t3.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态12">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q12"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t12"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/red.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态4">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q4"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t4"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/t4.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态5">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q5"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t5"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/t5.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态6">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q6"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t6"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/zc.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态7">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q7"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t7"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/tz.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态8">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q8"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t8"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/jd.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态9">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q9"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t9"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/yc.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态10">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q10"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t10"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/LOC.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态11">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q11"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t11"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/REM.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态13">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q13"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t13"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/kdw.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态13">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q22"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t22"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/gdw.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态14">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q14"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t14"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/ok.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态15">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q15"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t15"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/ok-tm.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态16">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q16"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t16"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/NG.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态17">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q17"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t17"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/Error.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态18">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q18"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t18"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/黄色抢-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态19">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q19"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t19"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/黄色枪-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态20">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q20"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t20"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/黑色枪-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态21">
        <el-col :span="10">
          <el-input v-model="main.activeOption.q21"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.t21"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./img/黑色枪-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


    </el-form>

    <el-form v-if="radio==='2'" label-width="80px" size="mini">
      <el-form-item label="状态1">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r1"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e1"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/M-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态2">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r2"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e2"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/M-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态3">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r3"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e3"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/V-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态4">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r4"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e4"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/V-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态5">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r5"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e5"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/向下-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态6">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r6"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e6"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/向下-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态7">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r7"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e7"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/四叶-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>
      <el-form-item label="状态8">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r8"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e8"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/四叶-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态9">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r9"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e9"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/头盔-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态10">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r10"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e10"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/头盔-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>


      <el-form-item label="状态11">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r11"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e11"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/房子-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态12">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r12"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e12"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/房子-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>
      <el-form-item label="状态13">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r13"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e13"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/插头-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>
      <el-form-item label="状态14">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r14"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e14"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/插头-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态15">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r15"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e15"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/旋转-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态16">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r16"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e16"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/旋转-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态17">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r17"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e17"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/横-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>
      <el-form-item label="状态18">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r18"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e18"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/横-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态19">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r19"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e19"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/汽车-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态20">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r20"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e20"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/汽车-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态21">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r21"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e21"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/电扇-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态22">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r22"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e22"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/电扇-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态23">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r23"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e23"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/竖-灰.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态24">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r24"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e24"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/竖-绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态25">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r25"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e25"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/红.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

      <el-form-item label="状态26">
        <el-col :span="10">
          <el-input v-model="main.activeOption.r26"></el-input>
        </el-col>
        <el-col :span="1">
          <span>=</span>
        </el-col>
        <el-col :span="5">
          <el-input v-model="main.activeOption.e26"></el-input>
        </el-col>
        <el-col :span="8">
          <img src="./rot/绿.png" style="height: 28px;width: 28px" alt="">
        </el-col>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  inject: ["main"],
  data() {
    return {
      activeName: '1',
      radio: '1',
      url: '/img/source/source13.svg',
      form: 'el-icon-info',
      info: {
        con: '',
        val: '',
        img: ''
      },
      tableData: [],
      options: [{
        value: '等于',
        label: '等于'
      }, {
        value: '小于',
        label: '小于'
      }, {
        value: '大于',
        label: '大于'
      }, {
        value: '小于等于',
        label: '小于等于'
      }, {
        value: '大于等于',
        label: '大于等于'
      }],
    }
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addData() {
      if (!this.main.activeOption.tableData) {
        this.main.activeOption.tableData = []
      }
      this.info.img = this.main.activeObj.data.value;
      this.main.activeOption.tableData.push(JSON.parse(JSON.stringify(this.info)))
    },
  }
}
</script>


<style>
.el-select .el-input {
  width: 120px;
}

.input-with-select .el-input-group__prepend {
  background-color: #1d1f26;
}

.input-with-select .el-input--mini .el-input__inner {
  height: 28px;
}
</style>
