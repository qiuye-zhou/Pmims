export const user = {
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
}

export const admin = {
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
}