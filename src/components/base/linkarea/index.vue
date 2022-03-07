<template>
  <div :style="{width:component.width+'px',height:component.height+'px'}" @click="clickThis">
  </div>
</template>
<script>
import {getVal} from '@/api/visual'

export default {
  name: 'baseLinkarea',
  props: {
    option: Object,
    component: Object,
  },
  data() {
    return {
      show: true,
    }
  },
  computed: {},
  created() {
  },
  mounted() {
	
  },
  // 销毁监听，防止内存泄露
  destroyed() {

  },
  methods: {
	  clickThis() {
          let myUrl = this.option.linkHref.indexOf('http')==-1 ? window.location.origin+'/view/'+this.option.linkHref : this.option.linkHref
		  if (this.option.linkTarget == '_blank') {
			window.open(myUrl)
		  } else if (this.option.linkTarget == '_self') {
              if (window != top){
                  window.location.href = myUrl
              }else {
                  top.location.href = myUrl;
              }
          }
		  if(this.option.linkStorageText) {
		  	window.sessionStorage.setItem('navSelect',this.option.linkStorageText)
		  } else {
			window.sessionStorage.removeItem('navSelect')
		  }
	  }
  },
}
</script>
<style lang="scss" scoped>
p{
  width: 100%;
  height: 100%;
}
</style>
