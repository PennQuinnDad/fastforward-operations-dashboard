import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
	icons: {
		defaultSet: 'mdi',
	},
})

createApp(App).use(vuetify).mount('#app')