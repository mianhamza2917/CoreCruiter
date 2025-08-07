<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Candidates</h1>
        <p class="text-gray-600 mt-2">Manage and track all candidate applications</p>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search candidates..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex gap-2">
            <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewed">Interviewed</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
            <select v-model="sourceFilter" class="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Sources</option>
              <option value="hh.ru">HH.ru</option>
              <option value="getmatch">Getmatch</option>
              <option value="linkedin">LinkedIn</option>
              <option value="telegram">Telegram</option>
            </select>
            <button @click="showAddModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Candidate
            </button>
          </div>
        </div>
      </div>

      <!-- Candidates Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-lg font-medium text-gray-900">All Candidates</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                <th class="hidden md:table-cell px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th class="hidden sm:table-cell px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th class="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="hidden lg:table-cell px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                <th class="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="candidate in filteredCandidates" :key="candidate.id" class="hover:bg-gray-50">
                <td class="px-3 lg:px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span class="text-xs lg:text-sm font-medium text-gray-700">{{ candidate.name.charAt(0) }}</span>
                    </div>
                    <div class="ml-3 lg:ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ candidate.name }}</div>
                      <div class="text-xs lg:text-sm text-gray-500">{{ candidate.email }}</div>
                      <div class="md:hidden text-xs text-gray-500 mt-1">{{ candidate.position }}</div>
                    </div>
                  </div>
                </td>
                <td class="hidden md:table-cell px-3 lg:px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ candidate.position }}</div>
                </td>
                <td class="hidden sm:table-cell px-3 lg:px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ candidate.source }}
                  </span>
                </td>
                <td class="px-3 lg:px-6 py-4 whitespace-nowrap">
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(candidate.status)"
                  >
                    {{ candidate.status }}
                  </span>
                </td>
                <td class="hidden lg:table-cell px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(candidate.appliedAt) }}
                </td>
                <td class="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    <button @click="viewCandidate(candidate)" class="text-blue-600 hover:text-blue-900 text-xs sm:text-sm">View</button>
                    <button @click="editCandidate(candidate)" class="text-green-600 hover:text-green-900 text-xs sm:text-sm">Edit</button>
                    <button @click="deleteCandidate(candidate.id)" class="text-red-600 hover:text-red-900 text-xs sm:text-sm">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ totalCandidates }}</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Candidate Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Add New Candidate</h3>
            <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="addCandidate" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input 
                v-model="newCandidate.name" 
                type="text" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input 
                v-model="newCandidate.email" 
                type="email" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Position</label>
              <input 
                v-model="newCandidate.position" 
                type="text" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Source</label>
              <select 
                v-model="newCandidate.source" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select source</option>
                <option value="HH.ru">HH.ru</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Getmatch">Getmatch</option>
                <option value="Telegram">Telegram</option>
                <option value="Habr Career">Habr Career</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select 
                v-model="newCandidate.status" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="new">New</option>
                <option value="reviewing">Reviewing</option>
                <option value="interviewed">Interviewed</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div class="flex justify-end space-x-3">
              <button 
                type="button"
                @click="showAddModal = false" 
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Edit Candidate Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Edit Candidate</h3>
            <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="updateCandidate">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input 
                  v-model="editingCandidate.name" 
                  type="text" 
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  v-model="editingCandidate.email" 
                  type="email" 
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Position</label>
                <input 
                  v-model="editingCandidate.position" 
                  type="text" 
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Source</label>
                <select 
                  v-model="editingCandidate.source" 
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select source</option>
                  <option value="HH.ru">HH.ru</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Getmatch">Getmatch</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Habr Career">Habr Career</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  v-model="editingCandidate.status" 
                  required
                  class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select status</option>
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div class="flex justify-end space-x-3">
                <button 
                  type="button"
                  @click="showEditModal = false" 
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Update Candidate
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const sourceFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingCandidate = ref({
  id: 0,
  name: '',
  email: '',
  position: '',
  source: '',
  status: '',
  appliedAt: new Date()
})

// Form data
const newCandidate = ref({
  name: '',
  email: '',
  position: '',
  source: '',
  status: ''
})

// Sample candidates data
const candidates = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Senior Frontend Developer',
    source: 'HH.ru',
    status: 'new',
    appliedAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    position: 'React Developer',
    source: 'LinkedIn',
    status: 'reviewing',
    appliedAt: new Date('2024-01-14')
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    position: 'Full Stack Developer',
    source: 'Getmatch',
    status: 'interviewed',
    appliedAt: new Date('2024-01-13')
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    position: 'Vue.js Developer',
    source: 'Telegram',
    status: 'hired',
    appliedAt: new Date('2024-01-12')
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    position: 'JavaScript Developer',
    source: 'HH.ru',
    status: 'rejected',
    appliedAt: new Date('2024-01-11')
  }
])

// Computed properties
const filteredCandidates = computed(() => {
  let filtered = candidates.value

  if (searchQuery.value) {
    filtered = filtered.filter(candidate =>
      candidate.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(candidate => candidate.status === statusFilter.value)
  }

  if (sourceFilter.value) {
    filtered = filtered.filter(candidate => candidate.source.toLowerCase() === sourceFilter.value.toLowerCase())
  }

  return filtered
})

const totalCandidates = computed(() => filteredCandidates.value.length)
const totalPages = computed(() => Math.ceil(totalCandidates.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalCandidates.value))

// Methods
const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}

const getStatusClass = (status: string) => {
  const classes = {
    new: 'bg-yellow-100 text-yellow-800',
    reviewing: 'bg-blue-100 text-blue-800',
    interviewed: 'bg-purple-100 text-purple-800',
    hired: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const addCandidate = () => {
  if (newCandidate.value.name && newCandidate.value.email && newCandidate.value.position && newCandidate.value.source && newCandidate.value.status) {
    const candidate = {
      id: Date.now(), // Use timestamp for unique ID
      name: newCandidate.value.name,
      email: newCandidate.value.email,
      position: newCandidate.value.position,
      source: newCandidate.value.source,
      status: newCandidate.value.status,
      appliedAt: new Date()
    }
    
    candidates.value.unshift(candidate)
    
    // Reset form
    newCandidate.value = {
      name: '',
      email: '',
      position: '',
      source: '',
      status: ''
    }
    
    showAddModal.value = false
    
    // Show success message
    showSuccessNotification(`Candidate ${candidate.name} added successfully!`, 'candidate')
  } else {
    showErrorNotification('Please fill in all required fields')
  }
}

const viewCandidate = (candidate: any) => {
  const message = `
Candidate Details:
Name: ${candidate.name}
Email: ${candidate.email}
Position: ${candidate.position}
Source: ${candidate.source}
Status: ${candidate.status}
Applied: ${formatDate(candidate.appliedAt)}
  `.trim()
  
  showInfoNotification(message, 'Candidate Details')
}

const editCandidate = (candidate: any) => {
  editingCandidate.value = { ...candidate }
  showEditModal.value = true
}

const updateCandidate = () => {
  const index = candidates.value.findIndex(c => c.id === editingCandidate.value.id)
  if (index !== -1) {
    candidates.value[index] = { ...editingCandidate.value }
    showEditModal.value = false
    showSuccessNotification(`Candidate ${editingCandidate.value.name} updated successfully!`, 'candidate')
  }
}

const deleteCandidate = (id: number) => {
  if (confirm('Are you sure you want to delete this candidate?')) {
    const candidate = candidates.value.find(c => c.id === id)
    candidates.value = candidates.value.filter(c => c.id !== id)
    
    if (candidate) {
      showSuccessNotification(`Candidate ${candidate.name} deleted successfully!`, 'candidate')
    }
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Attractive Success Notification
const showSuccessNotification = (message: string, type: 'candidate' | 'vacancy' = 'candidate') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out'
  
  const icon = type === 'candidate' ? 
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />' :
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />'
  
  notification.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 max-w-sm">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-semibold text-gray-900">Success!</h3>
          <p class="text-sm text-gray-600 mt-1">${message}</p>
          <div class="flex items-center mt-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${icon}
              </svg>
            </div>
            <span class="text-xs text-gray-500 capitalize">${type} ${message.includes('deleted') ? 'removed' : 'added'}</span>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="mt-4 pt-3 border-t border-gray-100">
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>Just now</span>
          <div class="flex items-center">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  `
  
  // Add to page with slide-in animation
  notification.style.transform = 'translateX(100%)'
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 10)
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 500)
  }, 5000)
}

// Attractive Error Notification
const showErrorNotification = (message: string) => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out'
  
  notification.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl border border-red-200 p-6 max-w-sm">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-semibold text-gray-900">Error</h3>
          <p class="text-sm text-gray-600 mt-1">${message}</p>
          <div class="mt-3">
            <button onclick="this.parentElement.parentElement.parentElement.remove()" class="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full hover:bg-red-100 transition-colors">
              Try Again
            </button>
          </div>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `
  
  // Add to page with slide-in animation
  notification.style.transform = 'translateX(100%)'
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 10)
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 500)
  }, 4000)
}

// Info Notification for details
const showInfoNotification = (message: string, title: string) => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out'
  
  notification.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl border border-blue-200 p-6 max-w-sm">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
          <p class="text-sm text-gray-600 mt-1 whitespace-pre-line">${message}</p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  `
  
  // Add to page with slide-in animation
  notification.style.transform = 'translateX(100%)'
  document.body.appendChild(notification)
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 10)
  
  // Auto remove after 6 seconds (longer for info)
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 500)
  }, 6000)
}
</script> 