<template>
  <div id="app">
    <nav v-if="isAuthenticated" class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-white text-xl font-bold">Task Manager</h1>
        <button 
          @click="logout" 
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
    </nav>
    <!-- Where our router will be rendered -->
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue'
import { computed } from 'vue'

const auth0 = useAuth0()

const isAuthenticated = computed(() => auth0.isAuthenticated.value)

const logout = () => {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>