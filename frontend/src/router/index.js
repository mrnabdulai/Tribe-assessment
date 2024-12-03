import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/TaskList.vue'
import Login from '../views/Login.vue'
import { authGuard } from '@auth0/auth0-vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList,
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router