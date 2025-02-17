import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component:()=> import("@/views/LoginView.vue")
    },
    {
      path: '/register',
      name: 'register',
      component:()=> import("@/views/RegisterView.vue")
    },
    {
      path: '/myevents',
      name: 'myevents',
      component:()=> import("@/views/MyEventsView.vue")
    },

    {
      path: '/events',
      name: 'events',
      component:()=> import("@/views/EventsView.vue")
    },
    {
      path: '/admin',
      name: 'admin',
      component:()=> import("@/views/AdminView.vue")
    }
  ],
})

export default router
