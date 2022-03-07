import Vue from 'vue'
import ElementUI from 'element-ui';
import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
import axios from './axios'
import 'element-ui/lib/theme-chalk/index.css';
import dataV from '@jiaminghi/data-view'
import router from './router.js';
import App from './App.vue'
import './styles/common.scss'
import { url } from '@/config'
import * as echarts from 'echarts'
import '@/utils/es6'
import '@/mock/'
//导入主题文件
import '@/theme/index.js'
import 'echarts-liquidfill'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

window.axios = axios;
Vue.config.productionTip = false
Vue.prototype.url = url;
Vue.prototype.$echart = echarts
Vue.use(Avue, {
  size: 'mini'
});
Vue.use(ViewUI);
Vue.use(ElementUI);
Vue.use(dataV)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


Vue.prototype.resetSetItem = function (key, newVal) {
  if (key === 'watchStorage') {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent)
      }
    }
    return storage.setItem(key, newVal);
  }
}


