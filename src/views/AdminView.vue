<script setup>
import { ref } from 'vue'
import { db } from '@/firebase/sdk'
import { collection, addDoc } from 'firebase/firestore'

const eventos = ref([])
const fecha = ref(null)
const hora = ref(null)
const nombre = ref(null)
const descripcion = ref(null)

const agregar = async () => {
  const nuevoEvento = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    hora: hora.value,
    fecha: fecha.value,
  }

  eventos.value.push(nuevoEvento)

  try {
    const docRef = await addDoc(collection(db, "eventos"),{
        nombre: nombre.value,
        descripcion: descripcion.value,
        hora: hora.value,
        fecha: fecha.value
    })

    console.log("Documento enviado")

  } catch (error) {
    console.log("error", error)
  }
  
  nombre.value = null
  descripcion.value = null
  fecha.value = null
  hora.value = null
  console.log(eventos.value)



}

</script>

<template>
  <div>
    <h1 class="text-3x1">Admin Administrator</h1>
    <div class="flex flex-col items-center gap-3">
      <h1 class="text-2xl">Agregar Eventos</h1>
      <form action="" @submit.prevent="agregar" class="flex flex-col items-center gap-3">
        <input type="text" name="" id="" v-model="nombre" placeholder="nombre" />
        <input type="text" name="" id="" v-model="descripcion" placeholder="descripction" />
        <input type="text" name="" id="" v-model="hora" placeholder="hora" />
        <input type="date" name="" id="" v-model="fecha" />
        <button type="submit" class="bg-emerald-200 p-2">Agregar</button>
      </form>
    </div>
  </div>
</template>

<style></style>
