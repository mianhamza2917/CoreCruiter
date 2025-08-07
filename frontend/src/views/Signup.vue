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
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl w-full space-y-6 lg:space-y-8">
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
        <!-- Account Info Form -->
        <form class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6" @submit.prevent="goToPersonalInfo">
          <h3 class="text-lg font-medium text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-blue-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Account Information
          </h3>
          <div class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-white mb-1">Full Name *</label>
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                required
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-white mb-1">Email Address *</label>
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
              <label for="password" class="block text-sm font-medium text-white mb-1">Password *</label>
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                required
                minlength="6"
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter a strong password (min 6 characters)"
              />
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <button type="submit" class="group relative flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Continue to Personal Info
            </button>
          </div>
        </form>
        <div class="flex justify-center mt-4 items-center gap-2">
          <span class="text-purple-200">If you already have an account,</span>
          <button @click="goToLogin" type="button" class="text-purple-200 hover:text-yellow-300 font-medium transition-colors duration-200">
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: '',
  email: '',
  password: ''
})

const goToPersonalInfo = () => {
  // Optionally, save form data to store or localStorage here
  router.push('/personal-info')
}

const goToLogin = () => {
  router.push('/login')
}
</script> 