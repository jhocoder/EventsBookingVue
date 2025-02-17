<script setup>
import { onMounted, ref } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/sdk'
import { auth } from '@/firebase/sdk'
import { updateDoc, arrayUnion, doc } from 'firebase/firestore'

const eventos = ref([])
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'eventos'))
  querySnapshot.forEach((doc) => {
    eventos.value.push({ id: doc.id, ...doc.data() })
  })
})

const agregarEvento = async (evento) => {
  const usuarioId =  auth.currentUser.uid
  console.log(usuarioId)

  const usuarioRef = doc(db,'usuarios',usuarioId)
  
    await updateDoc( usuarioRef,{
      mis_eventos: arrayUnion({
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      hora: evento.hora,
      fecha: evento.fecha,
      eventoId: evento.id,
    })})

    console.log('evento agregado')
  } 
</script>

<template>
  <h1>Events</h1>
  <section>
    <h1>Eventos Disponibles</h1>
    <ul v-for="evento in eventos" :key="evento.id" class="w-[40vh] flex flex-col p-2">
      <li class="bg-emerald-600 h-auto w-auto flex flex-col items-center p-3">
        <p><strong>Nombre Evento:</strong> {{ evento.nombre }}</p>
        <p><strong>Descripcion Evento:</strong> {{ evento.descripcion }}</p>
        <p><strong>Horario Evento:</strong> {{ evento.hora }}</p>
        <p><strong>Fecha Evento:</strong> {{ evento.fecha }}</p>
        <button
          class="bg-emerald-800 rounded-xl p-2 hover:bg-emerald-200 text-white"
          @click="agregarEvento(evento)"
        >
          Añadir evento mi perfil
        </button>
      </li>
    </ul>
  </section>
</template>

<style></style>
