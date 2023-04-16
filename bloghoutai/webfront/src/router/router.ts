import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/redirect', component: () => import('../components/redirect.vue') },
    { path: '/', redirect: '/home' },
    {
        path: '/home', name: 'home', component: () => import('../views/home.vue'), children: [
            {
                path: 'Article', component: () => import('../views/Article.vue'), name: 'Article',
            },
            {
                path: 'updateArticle', component: () => import('../views/updateArticle.vue'), name: 'updateArticle'
            },
            { path: 'articleDetail', component: () => import('../views/Article.vue'), name: 'articleDetail' }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export { router }

