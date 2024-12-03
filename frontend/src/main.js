import './index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuth0 } from '@auth0/auth0-vue'


const app = createApp(App)


app.use(
    createAuth0({
        domain: "dev-vr2mlgwjcs1hbcno.us.auth0.com",
        clientId: "MlCWanWYNVwU88EXLu5Meod0PdVyESjC",
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    })
)

app.use(router)

app.mount('#app')
