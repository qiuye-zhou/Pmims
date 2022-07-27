import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(createPinia())

router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.

    // store.commit('getToken')
    // const token = store.state.user.token
    // if (!token && to.name !== 'login-') {//没有token且当前页不是longin- 则返回登录页
    //     next({ name: 'login-' })
    // } else if (token && to.name === 'login-') {
    //     next({ name: 'home-' })
    // } else {
    //     next()
    // }
    next()
})

app.mount('#app')
