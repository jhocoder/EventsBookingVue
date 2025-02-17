<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'

const router = useRouter()
const store = authStore()
const email = ref('')
const password = ref('')

const login = async () => {
  const verified = await store.login(email.value, password.value)
  if (verified) {
    router.push({ name: 'events' })
  }
}
</script>

<template>
  <main class="flex items-center flex-col justify-center h-screen">
    <h1>Login</h1>
    <form action="" class="form" @submit.prevent="login">
      <input type="text" v-model="email" class="email mt-3" placeholder="Email" />
      <input type="text" v-model="password" class="password" placeholder="Password" />
      <button type="submit">Iniciar Sesion</button>
    </form>

    <span>No tienes cuenta?</span
    ><router-link to="/register" class="text-blue-800">Registrate</router-link>
  </main>
</template>
