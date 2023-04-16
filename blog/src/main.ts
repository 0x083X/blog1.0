import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
// import { createPinia } from 'pinia'
//如果后缀名是.ts就报错，将.ts删除就不会
import router from './router/index'
const app = createApp(App)
app.use(router)
// app.use(createPinia())
app.mount("#app")



