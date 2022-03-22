// import { Loading } from 'element-ui';
import axios from 'axios';
import router from './router';

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = 'Basic c2FiZXI6c2FiZXJfc2VjcmV0'
  if(localStorage.getItem('zt-token') && localStorage.getItem('zt-token') !=='undefined') {
    config.headers['Blade-Auth'] = 'bearer ' + JSON.parse(localStorage.getItem('zt-token'))
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPrequest拦截
axios.interceptors.response.use(config => {
  // loadingInstance.close();
  return config;
}, error => {
  return Promise.reject(new Error(error));
})

//http response 拦截
axios.interceptors.response.use(res => {
  //关闭 progress bar
  // NProgress.done();
  //获取状态码
  const status = res.data.code || res.status;
  const msg = res.data.msg
  // const statusWhiteList = website.statusWhiteList || [];
  // const message = res.data.msg || res.data.error_description || '未知错误';
  // //如果在白名单里则自行catch逻辑处理
  // if (statusWhiteList.includes(status)) return Promise.reject(res);
  // //如果是401则跳转到登录页面
  // if (status === 401) store.dispatch('FedLogOut').then(() => router.push({path: '/login'}));


 // console.log(res.config.url.indexOf("writePlcData"))

  if (status === 401 && res.config.url.indexOf("writePlcData") === -1){
    let protocol = window.location.protocol;
    let url = window.location.host;
    localStorage.setItem("next-url", window.location.href)
    localStorage.setItem("appId", router.history.current.params.id)
    window.location.href = protocol + "//" + url + "/login"
  }
  if(msg==='未登录') {
    let protocol = window.location.protocol;
    let url = window.location.host;
    localStorage.setItem("next-url", window.location.href)
    localStorage.setItem("appId", router.history.current.params.id)
    window.location.href = protocol + "//" + url + "/login"
  }


  // 如果请求为非200否者默认统一处理
  // if (status !== 200) {
  //   Message({
  //     message: message,
  //     type: 'error'
  //   });
  //   return Promise.reject(new Error(message))
  // }
  return res;
}, error => {
  //NProgress.done();
  return Promise.reject(new Error(error));
});




export default axios;
