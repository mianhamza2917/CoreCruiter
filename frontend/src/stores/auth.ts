import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

interface User {
  id: string
  email: string
  name: string
  phone?: string
  company?: string
  position?: string
  experienceLevel?: string
  location?: string
  role: string
  createdAt?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
  }

  const setUser = (userData: User) => {
    user.value = userData
  }

  const setError = (errorMessage: string) => {
    error.value = errorMessage
  }

  const clearError = () => {
    error.value = null
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    clearError()
    
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })

      const { user: userData, token: userToken } = response.data
      setToken(userToken)
      setUser(userData)
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      setError(errorMessage)
      return { 
        success: false, 
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  const signup = async (
    name: string, 
    email: string, 
    password: string,
    phone?: string,
    company?: string,
    position?: string,
    experienceLevel?: string,
    location?: string
  ) => {
    loading.value = true
    clearError()
    
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
        phone,
        company,
        position,
        experienceLevel,
        location
      })

      const { user: userData, token: userToken } = response.data
      setToken(userToken)
      setUser(userData)
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Signup failed'
      setError(errorMessage)
      return { 
        success: false, 
        message: errorMessage
      }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    clearError()
  }

  const checkAuth = async () => {
    if (!token.value) {
      return false
    }

    try {
      const response = await axios.get('/api/auth/me')
      setUser(response.data.user)
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  const updateUserInfo = async (userData: {
    phone?: string
    company?: string
    position?: string
    experienceLevel?: string
    location?: string
  }) => {
    if (!user.value) {
      throw new Error('No user logged in')
    }

    try {
      const response = await axios.put(`/api/users/${user.value.id}`, userData)
      setUser(response.data.user)
      return { success: true, user: response.data.user }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update user information'
      setError(errorMessage)
      return { 
        success: false, 
        message: errorMessage
      }
    }
  }

  const deleteAccount = async () => {
    if (!user.value) {
      throw new Error('No user logged in')
    }

    try {
      await axios.delete(`/api/users/${user.value.id}`)
      logout()
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to delete account'
      setError(errorMessage)
      return { 
        success: false, 
        message: errorMessage
      }
    }
  }

  // Initialize auth state
  if (token.value) {
    checkAuth()
  }

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    checkAuth,
    clearError,
    updateUserInfo,
    deleteAccount
  }
}) 