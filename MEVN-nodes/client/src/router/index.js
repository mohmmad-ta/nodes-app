import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/user/LogIn.vue'
import signup from '../views/user/SignUp.vue'
import nodes from '../views/NodesViev.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/signup",
      name: "signup",
      component: signup,
    },
    {
      path: "/nodes",
      name: "nodes",
      component: nodes,
    },
  ]
})

export default router
