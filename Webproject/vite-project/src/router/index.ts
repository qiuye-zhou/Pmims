import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[]= [
    {
        path: '/home',
        component: () => import('../views/home.vue')
    },
    {
        path: '/main',
        component: () => import('../views/main.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router