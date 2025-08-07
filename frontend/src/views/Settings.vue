<template>
  <div class="min-h-screen relative">
    <!-- Subtle Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <!-- Floating Elements -->
      <div class="absolute top-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      <div class="absolute top-40 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style="animation-delay: 2s;"></div>
      <div class="absolute -bottom-8 left-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style="animation-delay: 4s;"></div>
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style="animation-delay: 6s;"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p class="text-gray-600">Customize your application preferences and notifications</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Settings Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Notification Settings -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Notification Preferences
            </h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Email Notifications</h3>
                  <p class="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <button
                  @click="settings.emailNotifications = !settings.emailNotifications"
                  :class="settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Push Notifications</h3>
                  <p class="text-sm text-gray-500">Receive push notifications in browser</p>
                </div>
                <button
                  @click="settings.pushNotifications = !settings.pushNotifications"
                  :class="settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">New Candidate Alerts</h3>
                  <p class="text-sm text-gray-500">Get notified when new candidates apply</p>
                </div>
                <button
                  @click="settings.newCandidateAlerts = !settings.newCandidateAlerts"
                  :class="settings.newCandidateAlerts ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.newCandidateAlerts ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Weekly Reports</h3>
                  <p class="text-sm text-gray-500">Receive weekly recruitment reports</p>
                </div>
                <button
                  @click="settings.weeklyReports = !settings.weeklyReports"
                  :class="settings.weeklyReports ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.weeklyReports ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Display Settings -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Display Settings
            </h2>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <select
                  v-model="settings.theme"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select
                  v-model="settings.language"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Compact Mode</h3>
                  <p class="text-sm text-gray-500">Show more content in less space</p>
                </div>
                <button
                  @click="settings.compactMode = !settings.compactMode"
                  :class="settings.compactMode ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.compactMode ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privacy & Security
            </h2>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p class="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <button
                  @click="settings.twoFactorAuth = !settings.twoFactorAuth"
                  :class="settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Session Timeout</h3>
                  <p class="text-sm text-gray-500">Automatically log out after inactivity</p>
                </div>
                <select
                  v-model="settings.sessionTimeout"
                  class="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Data Analytics</h3>
                  <p class="text-sm text-gray-500">Allow usage data collection</p>
                </div>
                <button
                  @click="settings.dataAnalytics = !settings.dataAnalytics"
                  :class="settings.dataAnalytics ? 'bg-blue-600' : 'bg-gray-200'"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    :class="settings.dataAnalytics ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex justify-end">
            <button
              @click="saveSettings"
              :disabled="loading"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ loading ? 'Saving...' : 'Save Settings' }}
            </button>
          </div>
        </div>

        <!-- Settings Summary -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button
                @click="exportData"
                class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <svg class="w-4 h-4 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Data
              </button>
              <button
                @click="clearCache"
                class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <svg class="w-4 h-4 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cache
              </button>
              <button
                @click="deleteAccount"
                class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </button>
            </div>
          </div>

          <!-- System Info -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">App Version</span>
                <span class="text-sm font-medium text-gray-900">1.0.0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Last Updated</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(new Date()) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Storage Used</span>
                <span class="text-sm font-medium text-gray-900">2.3 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings'

const loading = ref(false)
const settingsStore = useSettingsStore()

// Use the settings from the store
const settings = settingsStore.settings

const saveSettings = async () => {
  loading.value = true
  try {
    // Save settings to localStorage via the store
    settingsStore.saveSettings()
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    showSuccessNotification('Settings saved successfully!')
  } catch (error) {
    showErrorNotification('Failed to save settings. Please try again.')
  } finally {
    loading.value = false
  }
}

const exportData = () => {
  showInfoNotification('Data export feature coming soon!')
}

const clearCache = () => {
  showInfoNotification('Cache cleared successfully!')
}

const deleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    showInfoNotification('Account deletion feature coming soon!')
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}

const showSuccessNotification = (message: string) => {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full'
  notification.textContent = message
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
  }, 100)
  
  setTimeout(() => {
    notification.classList.add('translate-x-full')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

const showErrorNotification = (message: string) => {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full'
  notification.textContent = message
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
  }, 100)
  
  setTimeout(() => {
    notification.classList.add('translate-x-full')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

const showInfoNotification = (message: string) => {
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full'
  notification.textContent = message
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.classList.remove('translate-x-full')
  }, 100)
  
  setTimeout(() => {
    notification.classList.add('translate-x-full')
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}
</script> 