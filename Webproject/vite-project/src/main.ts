import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/src/message.scss'
import storage from './localstorage/localstorage'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App)
app.use(router)
app.use(createPinia())
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
    }
import useMeunStore from './store/meun'
const store = useMeunStore()
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.

    const token = storage.get('token')
    if (!token && to.name !== 'login') {//没有token且当前页不是longin 则返回登录页
        next({ name: 'login' })
    } else {
        if (token && to.name == 'login') {
            next({ name: 'home' })
        } else {
            if(token) {
                if(storage.get('data').grade == 3) {
                    if(to.name == 'adminactiv' || to.name == 'userlist' || to.name =='userdetails') {
                        next('404')
                    } else {
                        next()
                    }
                } else {
                    if(to.name == 'activ' || to.name == 'prize') {
                        next('404')
                    } else {
                        next()
                    }
                }
            } else {
                next()
            }
        }
    }

    //解决url和其他方法跳转页面(除meun点击跳转)造成meun不会同时变化的问题,页面刷新跳转回home页面
    if (to.name) {
        store.setmeun(to.name)
    }
})

app.mount('#app')