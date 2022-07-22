import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[]= [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/main.vue'),
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/login.vue')
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