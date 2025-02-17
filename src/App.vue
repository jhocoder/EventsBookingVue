<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex justify-around w-full bg-emerald-950 text-white h-14 items-center">
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/events">Events</router-link>
    <router-link to="/myevents">My Events</router-link>
  </header>

  <RouterView />
</template>

<style scoped></style>
