import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'main',
        redirect: 'home',
        component: () => import('../views/main.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/Home/home.vue')
            },
            {
                path: 'activ',
                name: 'activ',
                component: () => import('../views/Activ/activ.vue')
            },
            {
                path: 'prize',
                name: 'prize',
                component: () => import('../views/Prize/prize.vue')
            },
            {
                path: 'user',
                name: 'user',
                component: () => import('../views/User/user.vue')
            },
        ]
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