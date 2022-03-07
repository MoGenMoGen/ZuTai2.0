<template>
  <div>
    <!--    <img src="./img/t2.png" alt="" v-if="defShow" height="20px">-->
    <img src="./img/t1.png" alt="" v-if="t1Show" height="20px">
    <img src="./img/t2.png" alt="" v-if="t2Show" height="20px">
    <img src="./img/t3.png" alt="" v-if="t3Show" height="20px">
    <img src="./img/t4.png" alt="" v-if="t4Show" height="20px">
    <img src="./img/t5.png" alt="" v-if="t5Show" height="20px">
    <img src="./img/zc.png" alt="" v-if="t6Show" height="20px">
    <img src="./img/tz.png" alt="" v-if="t7Show" height="20px">
    <img src="./img/jd.png" alt="" v-if="t8Show" height="20px">
    <img src="./img/yc.png" alt="" v-if="t9Show" height="20px">
    <img src="./img/LOC.png" alt="" v-if="t10Show" height="20px">
    <img src="./img/REM.png" alt="" v-if="t11Show" height="20px">
    <img src="./img/red.png" alt="" v-if="t12Show" height="20px">
    <img src="./img/kdw.png" alt="" v-if="t13Show" height="20px">
    <img src="./img/ok.png" alt="" v-if="t14Show" height="20px">
    <img src="./img/ok-tm.png" alt="" v-if="t15Show" height="20px">
    <img src="./img/NG.png" alt="" v-if="t16Show" height="20px">
    <img src="./img/Error.png" alt="" v-if="t17Show" height="20px">
    <img src="./img/黄色抢-灰.png" alt="" v-if="t18Show" height="20px">
    <img src="./img/黄色枪-绿.png" alt="" v-if="t19Show" height="20px">
    <img src="./img/黑色枪-灰.png" alt="" v-if="t20Show" height="20px">
    <img src="./img/黑色枪-绿.png" alt="" v-if="t21Show" height="20px">
    <img src="./img/gdw.png" alt="" v-if="t22Show" height="20px">


    <img src="./rot/M-灰.png" alt="" v-if="r1Show" height="28px">
    <img src="./rot/M-绿.png" alt="" v-if="r2Show" height="28px">

    <img src="./rot/V-灰.png" alt="" v-if="r3Show" height="28px">
    <img src="./rot/V-绿.png" alt="" v-if="r4Show" height="28px">

    <img src="./rot/向下-灰.png" alt="" v-if="r5Show" height="28px">
    <img src="./rot/向下-绿.png" alt="" v-if="r6Show" height="28px">

    <img src="./rot/四叶-灰.png" alt="" v-if="r7Show" height="28px">
    <img src="./rot/四叶-绿.png" alt="" v-if="r8Show" height="28px">

    <img src="./rot/头盔-灰.png" alt="" v-if="r9Show" height="28px">
    <img src="./rot/头盔-绿.png" alt="" v-if="r10Show" height="28px">

    <img src="./rot/房子-灰.png" alt="" v-if="r11Show" height="28px">
    <img src="./rot/房子-绿.png" alt="" v-if="r12Show" height="28px">

    <img src="./rot/插头-灰.png" alt="" v-if="r13Show" height="28px">
    <img src="./rot/插头-绿.png" alt="" v-if="r14Show" height="28px">

    <img src="./rot/旋转-灰.png" alt="" v-if="r15Show" height="28px">
    <img src="./rot/旋转-绿.png" alt="" v-if="r16Show" height="28px">

    <img src="./rot/横-灰.png" alt="" v-if="r17Show" height="28px">
    <img src="./rot/横-绿.png" alt="" v-if="r18Show" height="28px">

    <img src="./rot/汽车-灰.png" alt="" v-if="r19Show" height="28px">
    <img src="./rot/汽车-绿.png" alt="" v-if="r20Show" height="28px">

    <img src="./rot/电扇-灰.png" alt="" v-if="r21Show" height="28px">
    <img src="./rot/电扇-绿.png" alt="" v-if="r22Show" height="28px">

    <img src="./rot/竖-灰.png" alt="" v-if="r23Show" height="28px">
    <img src="./rot/竖-绿.png" alt="" v-if="r24Show" height="28px">

    <img src="./rot/红.png" alt="" v-if="r25Show" height="28px">
    <img src="./rot/绿.png" alt="" v-if="r26Show" height="28px">
  </div>
</template>
<script>
export default {
  name: 'state',
  props: {
    option: Object,
    component: Object
  },
  data() {
    return {
      t1Show: false,
      t2Show: false,
      t3Show: false,
      t4Show: false,
      t5Show: false,

      t6Show: false,
      t7Show: false,
      t8Show: false,
      t9Show: false,

      t10Show: false,
      t11Show: false,
      t12Show: false,
      t13Show: false,

      t14Show: false,
      t15Show: false,
      t16Show: false,
      t17Show: false,

      t18Show: false,
      t19Show: false,
      t20Show: false,
      t21Show: false,
      t22Show: false,


      r1Show: false,
      r2Show: false,
      r3Show: false,
      r4Show: false,
      r5Show: false,
      r6Show: false,
      r7Show: false,
      r8Show: false,
      r9Show: false,
      r10Show: false,
      r11Show: false,
      r12Show: false,
      r13Show: false,
      r14Show: false,
      r15Show: false,
      r16Show: false,
      r17Show: false,
      r18Show: false,
      r19Show: false,
      r20Show: false,
      r21Show: false,
      r22Show: false,
      r23Show: false,
      r24Show: false,
      r25Show: false,
      r26Show: false,

    }
  },
  computed: {},
  created() {
    this.getInfo()
    setInterval(this.getInfo, 10000);
  },
  methods: {
    getInfo() {

      if (this.option.q1) {
        this.t1Show = localStorage.getItem(this.option.q1) == this.option.t1;
      }
      if (this.option.q2) {
        this.t2Show = localStorage.getItem(this.option.q2) == this.option.t2;
      }
      if (this.option.q3) {
        this.t3Show = localStorage.getItem(this.option.q3) == this.option.t3;
      }
      if (this.option.q4) {
        this.t4Show = localStorage.getItem(this.option.q4) == this.option.t4;
      }
      if (this.option.q5) {
        this.t5Show = localStorage.getItem(this.option.q5) == this.option.t5;
      }
      if (this.option.q6) {
        this.t6Show = localStorage.getItem(this.option.q6) == this.option.t6;
      }

      if (this.option.q7) {
        this.t7Show = localStorage.getItem(this.option.q7) == this.option.t7;
      }

      if (this.option.q8) {
        this.t8Show = localStorage.getItem(this.option.q8) == this.option.t8;
      }
      if (this.option.q9) {
        this.t9Show = localStorage.getItem(this.option.q9) == this.option.t9;
      }
      if (this.option.q10) {
        this.t10Show = localStorage.getItem(this.option.q10) == this.option.t10;
      }
      if (this.option.q11) {
        this.t11Show = localStorage.getItem(this.option.q11) == this.option.t11;
      }

      if (this.option.q12) {
        this.t12Show = localStorage.getItem(this.option.q12) == this.option.t12;
      }

      if (this.option.q13) {
        this.t13Show = localStorage.getItem(this.option.q13) == this.option.t13;
      }

      if (this.option.q14) {
        this.t14Show = localStorage.getItem(this.option.q14) == this.option.t14;
      }
      if (this.option.q15) {
        this.t15Show = localStorage.getItem(this.option.q15) == this.option.t15;

      }
      if (this.option.q16) {
        this.t16Show = localStorage.getItem(this.option.q16) == this.option.t16;

      }
      if (this.option.q17) {
        this.t17Show = localStorage.getItem(this.option.q17) == this.option.t17;

      }

      if (this.option.q18) {
        this.t18Show = localStorage.getItem(this.option.q18) == this.option.t18;

      }
      if (this.option.q19) {
        this.t19Show = localStorage.getItem(this.option.q19) == this.option.t19;

      }
      if (this.option.q20) {
        this.t20Show = localStorage.getItem(this.option.q20) == this.option.t20;

      }
      if (this.option.q21) {
        this.t21Show = localStorage.getItem(this.option.q21) == this.option.t21;
      }
      if (this.option.q22) {
        this.t22Show = localStorage.getItem(this.option.q22) == this.option.t22;
      }
      if (this.option.r1) {
        this.r1Show = localStorage.getItem(this.option.r1) == this.option.e1;
      }
      if (this.option.r2) {
        this.r2Show = localStorage.getItem(this.option.r2) == this.option.e2;
      }
      if (this.option.r3) {
        this.r3Show = localStorage.getItem(this.option.r3) == this.option.e3;
      }
      if (this.option.r4) {
        this.r4Show = localStorage.getItem(this.option.r4) == this.option.e4;
      }
      if (this.option.r5) {
        this.r5Show = localStorage.getItem(this.option.r5) == this.option.e5;
      }
      if (this.option.r6) {
        this.r6Show = localStorage.getItem(this.option.r6) == this.option.e6;
      }
      if (this.option.r7) {
        this.r7Show = localStorage.getItem(this.option.r7) == this.option.e7;
      }
      if (this.option.r8) {
        this.r8Show = localStorage.getItem(this.option.r8) == this.option.e8;
      }
      if (this.option.r9) {
        this.r9Show = localStorage.getItem(this.option.r9) == this.option.e9;
      }
      if (this.option.r10) {
        this.r10Show = localStorage.getItem(this.option.r10) == this.option.e10;
      }
      if (this.option.r11) {
        this.r11Show = localStorage.getItem(this.option.r11) == this.option.e11;
      }
      if (this.option.r12) {
        this.r12Show = localStorage.getItem(this.option.r12) == this.option.e12;
      }
      if (this.option.r13) {
        this.r13Show = localStorage.getItem(this.option.r13) == this.option.e13;
      }
      if (this.option.r14) {
        this.r14Show = localStorage.getItem(this.option.r14) == this.option.e14;
      }
      if (this.option.r15) {
        this.r15Show = localStorage.getItem(this.option.r15) == this.option.e15;
      }
      if (this.option.r16) {
        this.r16Show = localStorage.getItem(this.option.r16) == this.option.e16;

      }
      if (this.option.r17) {
        this.r17Show = localStorage.getItem(this.option.r17) == this.option.e17;
      }
      if (this.option.r18) {
        this.r18Show = localStorage.getItem(this.option.r18) == this.option.e18;
      }
      if (this.option.r19) {
        this.r19Show = localStorage.getItem(this.option.r19) == this.option.e19;
      }
      if (this.option.r20) {
        this.r20Show = localStorage.getItem(this.option.r20) == this.option.e20;
      }
      if (this.option.r21) {
        this.r21Show = localStorage.getItem(this.option.r21) == this.option.e21;
      }
      if (this.option.r22) {
        this.r22Show = localStorage.getItem(this.option.r22) == this.option.e22;
      }
      if (this.option.r23) {
        this.r23Show = localStorage.getItem(this.option.r23) == this.option.e23;
      }
      if (this.option.r24) {
        this.r24Show = localStorage.getItem(this.option.r24) == this.option.e24;
      }
      if (this.option.r25) {
        this.r25Show = localStorage.getItem(this.option.r25) == this.option.e25;
      }
      if (this.option.r26) {
        this.r26Show = localStorage.getItem(this.option.r26) == this.option.e26;
      }

    }
  }
}
</script>
