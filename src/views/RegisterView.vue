<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '@/stores/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../firebase/sdk'

const router = useRouter()
const store = authStore()
const email = ref('')
const password = ref('')



const register = async () => {
  const verified = await store.register(email.value, password.value)
  console.log(verified)

  if (verified) {
    const usuarioId = auth.currentUser.uid 

    await setDoc(doc(db, 'usuarios', usuarioId), {
      nombre: email.value,
      mis_eventos: []  
    })

    router.push({ name: 'home' }) 
  }
}

</script>

<template>
  <main class="flex items-center flex-col justify-center h-screen">
    <h1>Register</h1>
    <form action="" class="form" @submit.prevent="register">
      <input type="text" v-model="email" class="email mt-3" placeholder="Email" />
      <input type="password" v-model="password" class="password" placeholder="Password" />
      <button type="submit" class="btn bg-amber-500">Registrarme</button>
    </form>

    <span>Ya tienes cuenta?</span>
    <router-link to="/login" class="text-blue-800">Inicia sesión</router-link>
  </main>
</template>
