import Vue from 'vue'
import App from './app.vue'

Vue.config.devtools = true

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render :(h) => h(App)
}).$mount(root)