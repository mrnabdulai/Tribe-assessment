<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Task Manager
          </h2>
        </div>
        <div>
          <button 
            @click="login" 
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuth0 } from '@auth0/auth0-vue'
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const auth0 = useAuth0()
  const router = useRouter()
  
  const login = () => {
    auth0.loginWithRedirect()
  }
  
  onMounted(async () => {
    // Check if already authenticated
    const isAuthenticated = await auth0.isAuthenticated.value
    if (isAuthenticated) {
      router.push('/')
    }
  })
  </script>