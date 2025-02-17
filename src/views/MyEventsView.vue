<script setup>
import { reactive, ref, watch } from 'vue';
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
  eventos.value = eventosUsuario.value

})

console.log(eventos.value)

const busqueda = ref(null)

watch(busqueda, (nuevoValor) => {
  if (!nuevoValor) {
    eventos.value = [...eventosUsuario.value];
  } else {
    eventos.value = eventosUsuario.value.filter((evento) =>
      evento.nombre.toLowerCase().includes(nuevoValor.toLowerCase())
    );
  }
});


</script>

<template>
    <h1>My Events</h1>
    <input type="text" placeholder="Buca tu evento Guardado" v-model="busqueda">
    <ul v-for="evento in eventos" :key="evento.nombre">
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