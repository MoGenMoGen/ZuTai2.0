import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router)
const vueRouter = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '首页',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/page/toIndex')
        },
        {
            path: '/index/',
            name: '列表页',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/page/index')
        }, {
            path: '/build/:id',
            name: 'build',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/page/build')
        }, {
            path: '/view/:id',
            name: 'view',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/page/view')
        }
        , {
            path: '/login/',
            name: 'login',
            component: () =>
                import( /* webpackChunkName: "page" */ '@/page/login')
        }]
})
export default vueRouter;
