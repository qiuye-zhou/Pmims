import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[]= [
    {
        path: '/',
        component: () => import('../views/main.vue')
    },
    {
        path: '/home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404/index.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router