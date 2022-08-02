export const user = {
    path: '/',
    name: 'main',
    redirect: 'home',
    url: './views/main.vue',
    children: [
        {
            path: 'home',
            name: 'home',
            url: './views/Home/home.vue',
            meta: { title: '主页',icon: 'HomeFilled' }
        },
        {
            path: 'activ',
            name: 'activ',
            url: './views/Activ/activ.vue',
            meta: { title: '活动中心',icon: 'HomeFilled' }
        },
        {
            path: 'prize',
            name: 'prize',
            url: './views/Prize/prize.vue',
            meta: { title: '所获奖项',icon: 'HomeFilled' }
        },
        {
            path: 'user',
            name: 'user',
            url: './views/User/user.vue',
            meta: { title: '个人中心',icon: 'HomeFilled' }
        },
    ]
}

export const admin = {
    path: '/',
    name: 'main',
    redirect: 'home',
    url: './views/main.vue',
    children: [
        {
            path: 'home',
            name: 'home',
            url: './views/Home/home.vue',
            meta: { title: '主页',icon: 'HomeFilled' }
        },
        {
            path: 'activ',
            name: 'activ',
            url: './views/Activ/activ.vue',
            meta: { title: '主页',icon: 'HomeFilled' }
        },
        {
            path: 'prize',
            name: 'prize',
            url: './views/Prize/prize.vue',
            meta: { title: '所获奖项',icon: 'HomeFilled' }
        },
        {
            path: 'user',
            name: 'user',
            url: './views/User/user.vue',
            meta: { title: '个人中心',icon: 'HomeFilled' }
        },
    ]
}