import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import less from 'less'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(less)

app.mount('#app')
