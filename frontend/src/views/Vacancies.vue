<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Vacancies</h1>
        <p class="text-gray-600 mt-2">Manage and track all job openings</p>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search vacancies..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div class="flex gap-2">
            <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
            <select v-model="departmentFilter" class="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
            </select>
            <button @click="showAddModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Vacancy
            </button>
          </div>
        </div>
      </div>

      <!-- Vacancies Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="vacancy in filteredVacancies" 
          :key="vacancy.id"
          class="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
          @click="viewVacancy(vacancy)"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">{{ vacancy.title }}</h3>
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(vacancy.status)"
              >
                {{ vacancy.status }}
              </span>
            </div>
            
            <div class="mb-4">
              <p class="text-sm text-gray-600 mb-2">{{ vacancy.department }}</p>
              <p class="text-sm text-gray-500">{{ vacancy.location }}</p>
            </div>

            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{{ vacancy.type }}</span>
              <span>{{ vacancy.salary }}</span>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>{{ vacancy.applications }} applications</span>
                <span>{{ formatDate(vacancy.createdAt) }}</span>
              </div>
              <div class="flex space-x-2">
                <button @click.stop="editVacancy(vacancy)" class="text-blue-600 hover:text-blue-900 text-sm">
                  Edit
                </button>
                <button @click.stop="deleteVacancy(vacancy.id)" class="text-red-600 hover:text-red-900 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredVacancies.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No vacancies found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new vacancy.</p>
        <div class="mt-6">
          <button @click="showAddModal = true" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Add Vacancy
          </button>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredVacancies.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6">
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
              Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ totalVacancies }}</span> results
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

    <!-- Add Vacancy Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Add New Vacancy</h3>
            <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form @submit.prevent="addVacancy" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Title</label>
              <input 
                v-model="newVacancy.title" 
                type="text" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Department</label>
              <select 
                v-model="newVacancy.department" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select department</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Location</label>
              <input 
                v-model="newVacancy.location" 
                type="text" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Type</label>
              <select 
                v-model="newVacancy.type" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Salary Range</label>
              <input 
                v-model="newVacancy.salary" 
                type="text" 
                placeholder="e.g., $50k - $80k"
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <select 
                v-model="newVacancy.status" 
                required
                class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
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
                Add Vacancy
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

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const departmentFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 9
const showAddModal = ref(false)

// Form data
const newVacancy = ref({
  title: '',
  department: '',
  location: '',
  type: '',
  salary: '',
  status: ''
})

// Sample vacancies data
const vacancies = ref([
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$80k - $120k',
    status: 'active',
    applications: 24,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 2,
    title: 'React Developer',
    department: 'Engineering',
    location: 'New York',
    type: 'Full-time',
    salary: '$70k - $100k',
    status: 'active',
    applications: 18,
    createdAt: new Date('2024-01-12')
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'San Francisco',
    type: 'Full-time',
    salary: '$75k - $110k',
    status: 'paused',
    applications: 12,
    createdAt: new Date('2024-01-08')
  },
  {
    id: 4,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    salary: '$60k - $90k',
    status: 'active',
    applications: 8,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 5,
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Chicago',
    type: 'Full-time',
    salary: '$50k - $80k',
    status: 'closed',
    applications: 32,
    createdAt: new Date('2024-01-05')
  },
  {
    id: 6,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $130k',
    status: 'draft',
    applications: 0,
    createdAt: new Date('2024-01-20')
  }
])

// Computed properties
const filteredVacancies = computed(() => {
  let filtered = vacancies.value

  if (searchQuery.value) {
    filtered = filtered.filter(vacancy =>
      vacancy.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vacancy.department.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vacancy.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(vacancy => vacancy.status === statusFilter.value)
  }

  if (departmentFilter.value) {
    filtered = filtered.filter(vacancy => vacancy.department.toLowerCase() === departmentFilter.value.toLowerCase())
  }

  return filtered
})

const totalVacancies = computed(() => filteredVacancies.value.length)
const totalPages = computed(() => Math.ceil(totalVacancies.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalVacancies.value))

// Methods
const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}

const getStatusClass = (status: string) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const addVacancy = () => {
  if (newVacancy.value.title && newVacancy.value.department && newVacancy.value.location && newVacancy.value.type && newVacancy.value.status) {
    const vacancy = {
      id: Date.now(), // Use timestamp for unique ID
      title: newVacancy.value.title,
      department: newVacancy.value.department,
      location: newVacancy.value.location,
      type: newVacancy.value.type,
      salary: newVacancy.value.salary || 'Not specified',
      status: newVacancy.value.status,
      applications: 0,
      createdAt: new Date()
    }
    
    vacancies.value.unshift(vacancy)
    
    // Reset form
    newVacancy.value = {
      title: '',
      department: '',
      location: '',
      type: '',
      salary: '',
      status: ''
    }
    
    showAddModal.value = false
    
    // Show success message
    showSuccessNotification(`Vacancy "${vacancy.title}" added successfully!`, 'vacancy')
  } else {
    showErrorNotification('Please fill in all required fields')
  }
}

const viewVacancy = (vacancy: any) => {
  const message = `
Vacancy Details:
Title: ${vacancy.title}
Department: ${vacancy.department}
Location: ${vacancy.location}
Type: ${vacancy.type}
Salary: ${vacancy.salary}
Status: ${vacancy.status}
Applications: ${vacancy.applications}
Created: ${formatDate(vacancy.createdAt)}
  `.trim()
  
  showInfoNotification(message, 'Vacancy Details')
}

const editVacancy = (vacancy: any) => {
  // For now, just show an alert. In a real app, you'd open an edit modal
  showInfoNotification(`Edit functionality for "${vacancy.title}" would open an edit form`, 'Edit Vacancy')
}

const deleteVacancy = (id: number) => {
  if (confirm('Are you sure you want to delete this vacancy?')) {
    const vacancy = vacancies.value.find(v => v.id === id)
    vacancies.value = vacancies.value.filter(v => v.id !== id)
    
    if (vacancy) {
      showSuccessNotification(`Vacancy "${vacancy.title}" deleted successfully!`, 'vacancy')
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
const showSuccessNotification = (message: string, type: 'candidate' | 'vacancy' = 'vacancy') => {
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