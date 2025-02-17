<script setup>
import { ref } from 'vue';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '@/firebase/sdk';
import { onMounted } from 'vue';
import { auth } from '@/firebase/sdk';
import { getDoc, doc } from 'firebase/firestore';


const eventosUsuario = ref(null)
const eventos = ref([])
onMounted(async () => {
  const usuarioId = auth.currentUser.uid
  
  const usuarioRef = doc(db, "usuarios", usuarioId)
  const obtenerDoc = await getDoc(usuarioRef)
  const dataUsuario = obtenerDoc.data()
  eventosUsuario.value = dataUsuario.mis_eventos
  console.log(dataUsuario)

})

console.log(eventos.value)

</script>

<template>
    <h1>My Events</h1>
    <ul v-for="evento in eventosUsuario" :key="evento.nombre">
        <li>
          Nombre:  {{ evento.nombre }}
          Descripcion:  {{ evento.descripcion }}
          Hora:  {{ evento.hora }}
          Fecha:  {{ evento.fecha }}
        </li>
    </ul>
</template>

<style>
</style>