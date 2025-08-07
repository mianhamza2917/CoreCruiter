import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  // Search state
  const searchQuery = ref('')
  const searchResults = ref<any[]>([])
  const isSearching = ref(false)
  const showSearchResults = ref(false)

  // Sample data (in a real app, this would come from API calls)
  const candidates = ref([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Senior Frontend Developer',
      source: 'HH.ru',
      status: 'new',
      itemType: 'candidate'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      position: 'React Developer',
      source: 'LinkedIn',
      status: 'reviewing',
      itemType: 'candidate'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      position: 'Full Stack Developer',
      source: 'Getmatch',
      status: 'interviewed',
      itemType: 'candidate'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      position: 'Vue.js Developer',
      source: 'Telegram',
      status: 'hired',
      itemType: 'candidate'
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@example.com',
      position: 'JavaScript Developer',
      source: 'HH.ru',
      status: 'rejected',
      itemType: 'candidate'
    }
  ])

  const vacancies = ref([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      employmentType: 'Full-time',
      salary: '$80k - $120k',
      status: 'active',
      applications: 24,
      itemType: 'vacancy'
    },
    {
      id: 2,
      title: 'React Developer',
      department: 'Engineering',
      location: 'New York',
      employmentType: 'Full-time',
      salary: '$70k - $100k',
      status: 'active',
      applications: 18,
      itemType: 'vacancy'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'San Francisco',
      employmentType: 'Full-time',
      salary: '$75k - $110k',
      status: 'paused',
      applications: 12,
      itemType: 'vacancy'
    },
    {
      id: 4,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      employmentType: 'Full-time',
      salary: '$60k - $90k',
      status: 'active',
      applications: 8,
      itemType: 'vacancy'
    },
    {
      id: 5,
      title: 'Sales Representative',
      department: 'Sales',
      location: 'Chicago',
      employmentType: 'Full-time',
      salary: '$50k - $80k',
      status: 'closed',
      applications: 32,
      itemType: 'vacancy'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      employmentType: 'Full-time',
      salary: '$90k - $130k',
      status: 'draft',
      applications: 0,
      itemType: 'vacancy'
    }
  ])

  // Computed properties
  const filteredResults = computed(() => {
    if (!searchQuery.value.trim()) {
      return []
    }

    const query = searchQuery.value.toLowerCase()
    const results: any[] = []

    // Search in candidates
    candidates.value.forEach(candidate => {
      if (
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.position.toLowerCase().includes(query) ||
        candidate.source.toLowerCase().includes(query)
      ) {
        results.push({
          ...candidate,
          category: 'Candidates',
          icon: '👤',
          route: '/candidates'
        })
      }
    })

    // Search in vacancies
    vacancies.value.forEach(vacancy => {
      if (
        vacancy.title.toLowerCase().includes(query) ||
        vacancy.department.toLowerCase().includes(query) ||
        vacancy.location.toLowerCase().includes(query) ||
        vacancy.employmentType.toLowerCase().includes(query)
      ) {
        results.push({
          ...vacancy,
          category: 'Vacancies',
          icon: '💼',
          route: '/vacancies'
        })
      }
    })

    return results.slice(0, 8) // Limit to 8 results
  })

  // Methods
  const performSearch = (query: string) => {
    searchQuery.value = query
    isSearching.value = true
    
    // Simulate API delay
    setTimeout(() => {
      searchResults.value = filteredResults.value
      isSearching.value = false
      showSearchResults.value = true
    }, 300)
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    showSearchResults.value = false
  }

  const hideSearchResults = () => {
    setTimeout(() => {
      showSearchResults.value = false
    }, 200)
  }

  return {
    // State
    searchQuery,
    searchResults,
    isSearching,
    showSearchResults,
    
    // Computed
    filteredResults,
    
    // Methods
    performSearch,
    clearSearch,
    hideSearchResults
  }
}) 