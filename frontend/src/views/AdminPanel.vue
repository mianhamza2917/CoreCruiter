<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Admin Panel</h1>
        <p class="mt-2 text-sm text-gray-700">
          Manage users and system settings
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          @click="showAddUserModal = true"
          class="btn-primary"
        >
          Add User
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <div class="mt-8 card">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h3 class="text-lg font-medium text-gray-900">Users</h3>
            <p class="mt-2 text-sm text-gray-700">
              A list of all users in the system
            </p>
          </div>
        </div>
        <div class="mt-8 flex flex-col">
          <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in users" :key="user.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ user.email }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              :class="user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'">
                          {{ user.role }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ new Date(user.createdAt).toLocaleDateString() }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          @click="editUser(user)"
                          class="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          @click="deleteUser(user.id)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit User Modal -->
    <div v-if="showAddUserModal || showEditUserModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showEditUserModal ? 'Edit User' : 'Add New User' }}
          </h3>
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="input-field mt-1"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field mt-1"
                />
              </div>
              <div v-if="!showEditUserModal">
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  required
                  class="input-field mt-1"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Role</label>
                <select v-model="form.role" class="input-field mt-1">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div class="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                @click="closeModal"
                class="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="btn-primary"
              >
                {{ loading ? 'Saving...' : (showEditUserModal ? 'Update' : 'Create') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
  updatedAt: string
}

const users = ref<User[]>([])
const loading = ref(false)
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const editingUser = ref<User | null>(null)

const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'USER'
})

const fetchUsers = async () => {
  try {
    const response = await axios.get('/api/users')
    users.value = response.data
  } catch (error: any) {
    console.error('Error fetching users:', error)
    alert(error.response?.data?.message || 'Error fetching users')
  }
}

const handleSubmit = async () => {
  loading.value = true
  
  try {
    if (showEditUserModal.value && editingUser.value) {
      await axios.put(`/api/users/${editingUser.value.id}`, {
        name: form.value.name,
        email: form.value.email,
        role: form.value.role
      })
    } else {
      await axios.post('/api/users', form.value)
    }
    
    await fetchUsers()
    closeModal()
  } catch (error: any) {
    console.error('Error saving user:', error)
    alert(error.response?.data?.message || 'Error saving user')
  } finally {
    loading.value = false
  }
}

const editUser = (user: User) => {
  editingUser.value = user
  form.value = {
    name: user.name,
    email: user.email,
    password: '',
    role: user.role
  }
  showEditUserModal.value = true
}

const deleteUser = async (userId: string) => {
  if (!confirm('Are you sure you want to delete this user?')) return
  
  try {
    await axios.delete(`/api/users/${userId}`)
    await fetchUsers()
  } catch (error: any) {
    console.error('Error deleting user:', error)
    alert(error.response?.data?.message || 'Error deleting user')
  }
}

const closeModal = () => {
  showAddUserModal.value = false
  showEditUserModal.value = false
  editingUser.value = null
  form.value = {
    name: '',
    email: '',
    password: '',
    role: 'USER'
  }
}

onMounted(() => {
  fetchUsers()
})
</script> 