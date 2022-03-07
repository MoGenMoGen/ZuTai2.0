<template>
  <div :style="{width:component.width+'px',height:component.height+'px'}">
     <iframe :src="linkHref" :id="'c'+option.index" frameborder="0" :width="component.width+'px'" scrolling="no" :height="component.height+'px'" ></iframe>
  </div>
</template>
<script>
export default {
  inject: ["main","contain"],
  name: 'baseModel',
  props: {
    option: Object,
    component: Object
  },
  computed: {
      linkHref () {
      return this.option.linkHref.indexOf('http')==-1 ? window.location.origin+'/view/'+this.option.linkHref : this.option.linkHref
    }
  },
    mounted(){
		// document.getElementById('c'+this.option.index).contentWindow.postMessage(this.contain.visual.navSelect,"*")
        // window.setInterval(this.reinitIframe(), 2);
    },
  methods: {
      reinitIframe(){
          var iframe = document.getElementById('c'+this.option.index);
          try{
              var bHeight = iframe.contentWindow.document.body.scrollHeight;
              var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
              var height = Math.max(bHeight, dHeight);
              iframe.height =  this.component.height+'px';
          }catch (ex){}
      }
  }
}
</script>
