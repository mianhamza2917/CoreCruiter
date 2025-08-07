<template>
  <div class="min-h-screen relative overflow-hidden">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div class="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 4s;"></div>
      <div class="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style="animation-delay: 6s;"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
    </div>
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-xl w-full space-y-6 lg:space-y-8">
        <div class="text-center">
          <div class="mx-auto w-20 h-20 mb-6 relative">
            <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 border border-white/20"></div>
            <div class="absolute inset-2 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
            <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg" style="animation-delay: 0.5s;"></div>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">
            <span class="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Personal Info
            </span>
          </h1>
          <p class="text-sm text-purple-200 font-medium">Tell us about yourself</p>
        </div>
        <form class="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-6" @submit.prevent="handleSignup">
          <h3 class="text-lg font-medium text-white mb-4 flex items-center">
            <svg class="w-5 h-5 text-purple-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Professional Information (Optional)
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="phone" class="block text-sm font-medium text-white mb-1">Phone Number</label>
              <input
                id="phone"
                v-model="form.phone"
                name="phone"
                type="tel"
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label for="company" class="block text-sm font-medium text-white mb-1">Company</label>
              <input
                id="company"
                v-model="form.company"
                name="company"
                type="text"
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your company name"
              />
            </div>
            <div>
              <label for="position" class="block text-sm font-medium text-white mb-1">Position/Title</label>
              <input
                id="position"
                v-model="form.position"
                name="position"
                type="text"
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="e.g., HR Manager, Recruiter"
              />
            </div>
            <div>
              <label for="experienceLevel" class="block text-sm font-medium text-white mb-1">Experience Level</label>
              <select
                id="experienceLevel"
                v-model="form.experienceLevel"
                name="experienceLevel"
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
              >
                <option value="" class="text-gray-800">Select experience level</option>
                <option value="entry" class="text-gray-800">Entry Level (0-2 years)</option>
                <option value="mid" class="text-gray-800">Mid Level (3-5 years)</option>
                <option value="senior" class="text-gray-800">Senior Level (6-10 years)</option>
                <option value="executive" class="text-gray-800">Executive Level (10+ years)</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label for="location" class="block text-sm font-medium text-white mb-1">Location</label>
              <input
                id="location"
                v-model="form.location"
                name="location"
                type="text"
                class="appearance-none relative block w-full px-3 py-3 border border-white/20 placeholder-purple-200 text-white bg-white/10 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your city, state, or country"
              />
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <button type="submit" :disabled="loading" class="group relative flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
        <div v-if="error" class="text-red-300 text-sm text-center bg-red-900/30 backdrop-blur-sm p-3 rounded-lg border border-red-500/30 mt-4">
          {{ error }}
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
  phone: '',
  company: '',
  position: '',
  experienceLevel: '',
  location: ''
})

const loading = computed(() => authStore.loading)
const error = computed(() => authStore.error)

const handleSignup = async () => {
  authStore.clearError()
  // You may want to merge with account info from store/localStorage
  const result = await authStore.signup(
    '', // name
    '', // email
    '', // password
    form.value.phone || undefined,
    form.value.company || undefined,
    form.value.position || undefined,
    form.value.experienceLevel || undefined,
    form.value.location || undefined
  )
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>