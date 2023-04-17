/**
 * 定制路由规则(路由懒加载)
 */
import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'
import NProgress from 'nprogress' //导入进度条nprogress
import 'nprogress/nprogress.css'
NProgress.configure({  //配置进度条
    showSpinner: false,
})

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: () => import('../views/home.vue'), name: 'home' },
    { path: '/Article', component: () => import('../views/Article.vue'), name: "Article" },
    { path: '/About', component: () => import('../views/About.vue'), name: "About" },
    { path: '/Project', component: () => import("../views/Project.vue") },
    { path: '/Article/:id', component: () => import('../views/ArticleDetail.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
router.beforeEach((to, from, next) => {
    NProgress.start() //在每次路由跳转开始时打开进度条
    next()
})

router.afterEach(() => {
    NProgress.done() //在每次结束路由跳转后关闭进度条
})

