import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/firebase/sdk'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/sdk'



export const authStore = defineStore('auth', () => {
  const state = reactive({
    user: null,
  })

  const userstate = () => {
    const userState = onAuthStateChanged(auth, (user) => {
      if (user) {
        state.user = user
      } else {
        state.user = null
      }
    })
  }

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        state.user = null
        alert('Sesion cerrada correctamente')
      })
      .catch((error) => {
        console.log('ha sucedido un error')
      })
  }

  const login = async (email, password) => {
    try {
      const userSign = await signInWithEmailAndPassword(auth, email, password)
      state.user = userSign.user
      return true
    } catch (error) {
      console.log('error:', error)
    }
  }

  const register = async (email, password) => {
    try {
      const userRegister = await createUserWithEmailAndPassword(auth, email, password)
      state.user = userRegister.user
      return true

    } catch (error) {
      console.log('error:', error)
    }
  }
  return { login, register, state, logout, userstate }
})
