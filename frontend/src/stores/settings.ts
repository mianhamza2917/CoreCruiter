import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  // Settings state
  const settings = reactive({
    emailNotifications: true,
    pushNotifications: true,
    newCandidateAlerts: true,
    weeklyReports: false,
    theme: 'light',
    language: 'en',
    compactMode: false,
    twoFactorAuth: false,
    sessionTimeout: '30',
    dataAnalytics: true
  })

  // Load settings from localStorage on initialization
  const loadSettings = () => {
    const savedSettings = localStorage.getItem('app-settings')
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      Object.assign(settings, parsed)
    }
  }

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem('app-settings', JSON.stringify(settings))
  }

  // Apply theme to document
  const applyTheme = (theme: string) => {
    const html = document.documentElement
    const body = document.body
    
    // Remove existing theme classes
    html.classList.remove('dark', 'light')
    body.classList.remove('dark', 'light')
    
    if (theme === 'dark') {
      html.classList.add('dark')
      body.classList.add('dark')
    } else if (theme === 'auto') {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        html.classList.add('dark')
        body.classList.add('dark')
      }
    }
  }

  // Apply language
  const applyLanguage = (language: string) => {
    // Set HTML lang attribute
    document.documentElement.lang = language
    
    // Store language preference
    localStorage.setItem('app-language', language)
  }

  // Watch for theme changes and apply them
  watch(() => settings.theme, (newTheme) => {
    applyTheme(newTheme)
    saveSettings()
  })

  // Watch for language changes and apply them
  watch(() => settings.language, (newLanguage) => {
    applyLanguage(newLanguage)
    saveSettings()
  })

  // Initialize settings
  loadSettings()
  applyTheme(settings.theme)
  applyLanguage(settings.language)

  // Listen for system theme changes when auto mode is enabled
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (settings.theme === 'auto') {
        applyTheme('auto')
      }
    })
  }

  return {
    settings,
    saveSettings,
    applyTheme,
    applyLanguage,
    loadSettings
  }
}) 