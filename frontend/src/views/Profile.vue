<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p class="text-gray-600">Manage your account information and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Information -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h2>
            
            <form @submit.prevent="updateProfile" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    v-model="profileForm.name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    v-model="profileForm.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    v-model="profileForm.location"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your location"
                  />
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    v-model="profileForm.company"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your company"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    v-model="profileForm.position"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your position"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select
                  v-model="profileForm.experienceLevel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6-10 years)</option>
                  <option value="executive">Executive Level (10+ years)</option>
                </select>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ loading ? 'Updating...' : 'Update Profile' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </h2>
            
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  v-model="passwordForm.currentPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    v-model="passwordForm.newPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    v-model="passwordForm.confirmPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="passwordLoading"
                  class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ passwordLoading ? 'Changing...' : 'Change Password' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Profile Summary -->
        <div class="space-y-6">
          <!-- Profile Card -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="text-center">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-white">{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">{{ authStore.user?.name || 'User' }}</h3>
              <p class="text-sm text-gray-500">{{ authStore.user?.email || 'user@example.com' }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ authStore.user?.role || 'User' }}</p>
            </div>
          </div>

          <!-- User Information Display -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                User Information
              </h3>
              <div class="flex space-x-2">
                <button
                  @click="toggleEditMode"
                  :class="isEditMode ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'"
                  class="px-3 py-1 text-xs text-white rounded-md transition-colors duration-200 flex items-center"
                >
                  <svg v-if="!isEditMode" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {{ isEditMode ? 'Cancel' : 'Edit' }}
                </button>
                <button
                  v-if="isEditMode"
                  @click="saveChanges"
                  :disabled="saving"
                  class="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ saving ? 'Saving...' : 'Save' }}
                </button>
              </div>
            </div>
            
            <div v-if="!isEditMode" class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Phone</span>
                <span class="text-sm font-medium text-gray-900">{{ authStore.user?.phone || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Company</span>
                <span class="text-sm font-medium text-gray-900">{{ authStore.user?.company || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Position</span>
                <span class="text-sm font-medium text-gray-900">{{ authStore.user?.position || 'Not provided' }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Experience Level</span>
                <span class="text-sm font-medium text-gray-900">{{ formatExperienceLevel(authStore.user?.experienceLevel) }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-sm text-gray-600">Location</span>
                <span class="text-sm font-medium text-gray-900">{{ authStore.user?.location || 'Not provided' }}</span>
              </div>
            </div>
            
            <div v-else class="space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    v-model="editForm.phone"
                    type="tel"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Company</label>
                  <input
                    v-model="editForm.company"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Position</label>
                  <input
                    v-model="editForm.position"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter position"
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Location</label>
                  <input
                    v-model="editForm.location"
                    type="text"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-xs font-medium text-gray-700 mb-1">Experience Level</label>
                  <select
                    v-model="editForm.experienceLevel"
                    class="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select experience level</option>
                    <option value="entry">Entry Level (0-2 years)</option>
                    <option value="mid">Mid Level (3-5 years)</option>
                    <option value="senior">Senior Level (6-10 years)</option>
                    <option value="executive">Executive Level (10+ years)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Account Stats -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Statistics</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Member since</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(authStore.user?.createdAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Last login</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(new Date()) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Account status</span>
                <span class="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <h3 class="text-lg font-semibold text-red-700 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              Danger Zone
            </h3>
            <div class="space-y-3">
              <p class="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                @click="confirmDeleteAccount"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const passwordLoading = ref(false)
const isEditMode = ref(false)
const saving = ref(false)

const profileForm = reactive({
  name: '',
  email: '',
  phone: '',
  location: '',
  company: '',
  position: '',
  experienceLevel: ''
})

const editForm = reactive({
  phone: '',
  company: '',
  position: '',
  location: '',
  experienceLevel: ''
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(() => {
  // Initialize form with user data
  if (authStore.user) {
    profileForm.name = authStore.user.name || ''
    profileForm.email = authStore.user.email || ''
    profileForm.phone = authStore.user.phone || ''
    profileForm.location = authStore.user.location || ''
    profileForm.company = authStore.user.company || ''
    profileForm.position = authStore.user.position || ''
    profileForm.experienceLevel = authStore.user.experienceLevel || ''
    
    // Initialize edit form
    editForm.phone = authStore.user.phone || ''
    editForm.company = authStore.user.company || ''
    editForm.position = authStore.user.position || ''
    editForm.location = authStore.user.location || ''
    editForm.experienceLevel = authStore.user.experienceLevel || ''
  }
})

const updateProfile = async () => {
  loading.value = true
  try {
    // Here you would typically make an API call to update the profile
    // For now, we'll just simulate the update
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success notification
    showSuccessNotification('Profile updated successfully!')
  } catch (error) {
    showErrorNotification('Failed to update profile. Please try again.')
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    showErrorNotification('New passwords do not match.')
    return
  }
  
  passwordLoading.value = true
  try {
    // Here you would typically make an API call to change the password
    // For now, we'll just simulate the change
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Clear form
    passwordForm.currentPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
    
    showSuccessNotification('Password changed successfully!')
  } catch (error) {
    showErrorNotification('Failed to change password. Please try again.')
  } finally {
    passwordLoading.value = false
  }
}

const toggleEditMode = () => {
  if (isEditMode.value) {
    // Cancel edit mode - reset form
    editForm.phone = authStore.user?.phone || ''
    editForm.company = authStore.user?.company || ''
    editForm.position = authStore.user?.position || ''
    editForm.location = authStore.user?.location || ''
    editForm.experienceLevel = authStore.user?.experienceLevel || ''
  }
  isEditMode.value = !isEditMode.value
}

const saveChanges = async () => {
  saving.value = true
  try {
    const result = await authStore.updateUserInfo({
      phone: editForm.phone,
      company: editForm.company,
      position: editForm.position,
      location: editForm.location,
      experienceLevel: editForm.experienceLevel
    })
    
    if (result.success) {
      isEditMode.value = false
      showSuccessNotification('User information updated successfully!')
    } else {
      showErrorNotification(result.message || 'Failed to update user information.')
    }
  } catch (error) {
    showErrorNotification('Failed to update user information. Please try again.')
  } finally {
    saving.value = false
  }
}

const confirmDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.')) {
    deleteAccount()
  }
}

const deleteAccount = async () => {
  try {
    const result = await authStore.deleteAccount()
    
    if (result.success) {
      showSuccessNotification('Account deleted successfully!')
      // Redirect to login page
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      showErrorNotification(result.message || 'Failed to delete account.')
    }
  } catch (error) {
    showErrorNotification('Failed to delete account. Please try again.')
  }
}

const formatDate = (date: Date | string | undefined) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString()
}

const formatExperienceLevel = (level: string | undefined) => {
  switch (level) {
    case 'entry':
      return 'Entry Level (0-2 years)'
    case 'mid':
      return 'Mid Level (3-5 years)'
    case 'senior':
      return 'Senior Level (6-10 years)'
    case 'executive':
      return 'Executive Level (10+ years)'
    default:
      return 'Not specified'
  }
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
</script> 