<template>
  <div id="app">
    <!-- Background Logo -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div class="absolute inset-0 flex items-center justify-center opacity-5">
        <div class="text-center">
          <!-- Main Logo -->
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
          </div>
          <!-- Logo Text -->
          <div class="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Corecruiter
          </div>
          <!-- Tagline -->
          <div class="text-xl text-gray-400 mt-2 font-medium">
            Smart Recruitment Platform
          </div>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
      <div class="absolute bottom-20 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20"></div>
      <div class="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30"></div>
      <div class="absolute top-1/3 right-16 w-20 h-20 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-30"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10">
      <!-- Navigation Bar - Only show on authenticated pages -->
      <nav v-if="!isAuthPage" class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo and Navigation -->
            <div class="flex items-center">
              <!-- Logo -->
              <div class="flex items-center mr-8">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Corecruiter</span>
              </div>
              
              <!-- Navigation Links -->
              <div class="hidden md:flex space-x-4 lg:space-x-8">
                <router-link to="/" class="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Dashboard
                </router-link>
                <router-link to="/candidates" class="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Candidates
                </router-link>
                <router-link to="/vacancies" class="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Vacancies
                </router-link>
                <router-link v-if="authStore.user?.role === 'ADMIN'" to="/admin" class="text-gray-600 hover:text-gray-900 px-2 lg:px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Admin Panel
                </router-link>
              </div>
            </div>

            <!-- Right Side -->
            <div class="flex items-center space-x-2 lg:space-x-4">
              <!-- Search Bar -->
              <div class="relative hidden md:block">
                <input
                  v-model="searchStore.searchQuery"
                  @input="handleSearch"
                  @focus="searchStore.showSearchResults = true"
                  @blur="searchStore.hideSearchResults"
                  type="text"
                  placeholder="Search by Candidates, Jobs, Companies"
                  class="w-48 lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                
                <!-- Search Results Dropdown -->
                <div v-if="searchStore.showSearchResults && searchStore.searchResults.length > 0" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div class="py-2">
                    <div v-for="result in searchStore.searchResults" :key="`${result.category}-${result.id}`" 
                         @click="selectSearchResult(result)"
                         class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                      <div class="flex items-center">
                        <span class="text-lg mr-3">{{ result.icon }}</span>
                        <div class="flex-1">
                          <div class="flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-900">
                              {{ result.name || result.title }}
                            </p>
                            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ result.category }}</span>
                          </div>
                          <p class="text-xs text-gray-500 mt-1">
                            {{ result.email || result.department }} • {{ result.position || result.location }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- No Results -->
                <div v-if="searchStore.showSearchResults && searchStore.searchQuery && searchStore.searchResults.length === 0 && !searchStore.isSearching" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div class="px-4 py-3 text-sm text-gray-500">
                    No results found for "{{ searchStore.searchQuery }}"
                  </div>
                </div>
                
                <!-- Loading State -->
                <div v-if="searchStore.isSearching" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div class="px-4 py-3 text-sm text-gray-500 flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                </div>
              </div>



              <!-- Notifications -->
              <div class="relative notifications">
                <button @click="toggleNotifications" class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span v-if="unreadNotificationsCount > 0" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>

                <!-- Notifications Dropdown -->
                <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div class="py-1">
                    <div class="px-4 py-2 border-b border-gray-200">
                      <div class="flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
                        <button @click="markAllRead" class="text-xs text-blue-600 hover:text-blue-800">Mark all read</button>
                      </div>
                    </div>
                    <div class="max-h-64 overflow-y-auto">
                      <div v-for="notification in notifications" :key="notification.id" @click="markNotificationRead(notification.id)" class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                        <div class="flex items-start">
                          <div class="flex-shrink-0">
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                          <div class="ml-3 flex-1">
                            <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                            <p class="text-sm text-gray-500">{{ notification.message }}</p>
                            <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                          </div>
                          <div v-if="!notification.read" class="ml-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div v-if="notifications.length === 0" class="px-4 py-3 text-sm text-gray-500 text-center">
                        No notifications
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- User Menu -->
              <div class="relative user-menu">
                <button @click="showUserMenu = !showUserMenu" class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-white">{{ authStore.user?.name?.charAt(0) || 'U' }}</span>
                  </div>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <!-- User Dropdown -->
                <div v-if="showUserMenu" class="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <div class="py-1">
                    <div class="px-4 py-2 border-b border-gray-200">
                      <p class="text-sm font-medium text-gray-900 truncate">{{ authStore.user?.name || 'User' }}</p>
                      <p class="text-xs text-gray-500 truncate" :title="authStore.user?.email || 'user@example.com'">{{ authStore.user?.email || 'user@example.com' }}</p>
                    </div>
                    <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </router-link>
                    <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </router-link>
                    <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>

              <!-- Mobile menu button -->
              <button @click="showMobileMenu = !showMobileMenu" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile menu -->
          <div v-if="showMobileMenu" class="md:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <router-link to="/" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Dashboard</router-link>
              <router-link to="/candidates" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Candidates</router-link>
              <router-link to="/vacancies" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Vacancies</router-link>
              <router-link v-if="authStore.user?.role === 'ADMIN'" to="/admin" class="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">Admin Panel</router-link>
              
              <!-- Mobile Search -->
              <div class="px-3 py-2">
                <div class="relative">
                  <input
                    v-model="searchStore.searchQuery"
                    @input="handleSearch"
                    type="text"
                    placeholder="Search..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <main class="relative z-10 min-h-screen">
        <router-view />
      </main>

      <!-- Footer - Only show on authenticated pages -->
      <footer v-if="!isAuthPage" class="bg-white border-t border-gray-200 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <!-- Company Info -->
            <div class="col-span-1 sm:col-span-2 lg:col-span-2">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Corecruiter</span>
              </div>
              <p class="text-gray-600 mb-4 max-w-md">
                Smart recruitment platform that connects talented professionals with innovative companies. 
                Streamline your hiring process with AI-powered candidate matching and comprehensive analytics.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-400 hover:text-blue-600 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Platform</h3>
              <ul class="space-y-3">
                <li>
                  <router-link to="/dashboard" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Dashboard
                  </router-link>
                </li>
                <li>
                  <router-link to="/candidates" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Candidates
                  </router-link>
                </li>
                <li>
                  <router-link to="/vacancies" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Vacancies
                  </router-link>
                </li>
                <li>
                  <router-link v-if="authStore.user?.role === 'ADMIN'" to="/admin" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Admin Panel
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Support -->
            <div>
              <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Support</h3>
              <ul class="space-y-3">
                <li>
                  <router-link to="/support" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Support
                  </router-link>
                </li>
                <li>
                  <router-link to="/help" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Help Center
                  </router-link>
                </li>
                <li>
                  <router-link to="/contact" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Contact Us
                  </router-link>
                </li>
                <li>
                  <router-link to="/privacy" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Privacy Policy
                  </router-link>
                </li>
                <li>
                  <router-link to="/terms" class="text-gray-600 hover:text-blue-600 transition-colors">
                    Terms of Service
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <!-- Bottom Section -->
          <div class="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-200">
            <div class="flex justify-center">
              <div class="text-gray-500 text-sm text-center">
                © 2024 Corecruiter. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSearchStore } from '@/stores/search'
import { useSettingsStore } from '@/stores/settings'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const searchStore = useSearchStore()
const settingsStore = useSettingsStore()
const route = useRoute()
const router = useRouter()

// Reactive data
const showUserMenu = ref(false)
const showNotifications = ref(false)
const showMobileMenu = ref(false)

// Computed properties
const isAuthPage = computed(() => {
  return route.name === 'Login' || route.name === 'Signup' || route.name === 'PersonalInfo'
})

const notifications = ref([
  {
    id: 1,
    title: 'New Candidate',
    message: 'John Doe applied for Senior Frontend Developer position',
    time: '2 minutes ago',
    read: false
  },
  {
    id: 2,
    title: 'Vacancy Updated',
    message: 'React Developer position status changed to Active',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    title: 'Interview Scheduled',
    message: 'Phone interview scheduled for Sarah Wilson',
    time: '3 hours ago',
    read: true
  }
])

// Computed properties
const unreadNotificationsCount = computed(() => {
  return notifications.value.filter(notification => !notification.read).length
})

// Methods
const handleSearch = () => {
  searchStore.performSearch(searchStore.searchQuery)
}

const selectSearchResult = (result: any) => {
  searchStore.clearSearch()
  router.push(result.route)
}



const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
  showUserMenu.value = false
  showMobileMenu.value = false
}

const markNotificationRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const markAllRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true
  })
}

const logout = () => {
  authStore.logout()
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  
  // Close user menu if clicking outside
  if (showUserMenu.value && !target.closest('.user-menu')) {
    showUserMenu.value = false
  }
  
  // Close notifications if clicking outside
  if (showNotifications.value && !target.closest('.notifications')) {
    showNotifications.value = false
  }
  
  // Close mobile menu if clicking outside
  if (showMobileMenu.value && !target.closest('.mobile-menu')) {
    showMobileMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* Custom scrollbar for notifications */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style> 