<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 4s;"></div>
      <div class="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 6s;"></div>
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-6 lg:space-y-8">
        <!-- Logo Section -->
        <div class="text-center">
          <div class="mx-auto w-20 h-20 mb-6 relative">
            <!-- Logo Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-white/20"></div>
            <!-- Logo Icon -->
            <div class="absolute inset-2 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <!-- Decorative Elements -->
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
            <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" style="animation-delay: 0.5s;"></div>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">
            <span class="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Corecruiter
            </span>
          </h1>
          <p class="text-sm text-purple-200 font-medium">Smart Recruitment Platform</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
          <div>
            <h2 class="text-center text-2xl font-bold text-white mb-2">
              Sign in to your account
            </h2>
            <p class="text-center text-sm text-purple-200">
              Or
              <router-link to="/signup" class="font-medium text-yellow-300 hover:text-yellow-200 transition-colors duration-200">
                create a new account
              </router-link>
            </p>
          </div>
          <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-sm font-medium text-white mb-1">Email Address</label>
                <input
                  id="email"
                  v-model="form.email"
                  name="email"
                  type="email"
                  required
                  class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-white mb-1">Password</label>
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  required
                  class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div v-if="error" class="text-red-300 text-sm text-center bg-red-900/30 backdrop-blur-sm p-3 rounded-lg border border-red-500/30">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="loading"
                class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                {{ loading ? 'Signing in...' : 'Sign in' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const handleLogin = async () => {
  authStore.clearError()

  const result = await authStore.login(form.value.email, form.value.password)
  
  if (result.success) {
    router.push('/dashboard')
  }
}
</script> 