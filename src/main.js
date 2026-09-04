import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import './style.css'
import 'vuetify/styles'

const vuetify = createVuetify()

createApp(App).use(vuetify).mount('#app')