<template>
  <div class="min-h-screen">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <!-- Header with Add Buttons -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 space-y-4 sm:space-y-0">
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button 
            @click="showAddCandidateModal = true"
            class="inline-flex items-center justify-center px-3 lg:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Candidate
          </button>
          <button 
            @click="showAddVacancyModal = true"
            class="inline-flex items-center justify-center px-3 lg:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
            Add Vacancy
          </button>
        </div>
      </div>

      <!-- Key Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <!-- Total Candidates -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer" @click="refreshMetrics">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Candidates</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalCandidates }}</p>
              <p class="text-xs text-gray-500 mt-1">registered candidates</p>
            </div>
            <div class="flex items-center text-green-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-sm font-medium">+{{ newCandidatesToday }}</span>
            </div>
          </div>
        </div>

        <!-- Total Vacancies -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer" @click="refreshMetrics">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Vacancies</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalVacancies }}</p>
              <p class="text-xs text-gray-500 mt-1">job openings</p>
            </div>
            <div class="flex items-center text-blue-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
              <span class="text-sm font-medium">{{ activeVacancies.length }}</span>
            </div>
          </div>
        </div>

        <!-- Active Vacancies -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer" @click="refreshMetrics">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Vacancies</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeVacancies.length }}</p>
              <p class="text-xs text-gray-500 mt-1">currently open</p>
            </div>
            <div class="flex items-center text-green-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm font-medium">{{ activePercentage }}%</span>
            </div>
          </div>
        </div>

        <!-- Total Applications -->
        <div class="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer" @click="refreshMetrics">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Applications</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalApplications }}</p>
              <p class="text-xs text-gray-500 mt-1">submitted</p>
            </div>
            <div class="flex items-center text-purple-600">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span class="text-sm font-medium">+{{ newApplicationsToday }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 lg:mb-8">
        <!-- Candidate Statistics -->
        <div class="bg-white rounded-lg shadow p-4 md:p-6">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h3 class="text-base md:text-lg font-medium text-gray-900">Candidate Statistics</h3>
            <button @click="refreshCandidateStats" data-refresh="stats" class="text-xs md:text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <svg class="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          <div class="space-y-4 md:space-y-6">
            <!-- Statistics Overview Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
              <!-- Average Time to Hire -->
              <div class="bg-gradient-to-br from-indigo-50 to-indigo-100 p-3 md:p-4 rounded-xl border border-indigo-200">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs md:text-sm font-medium text-indigo-800 flex items-center">
                      <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Avg Time to Hire
                    </div>
                    <p class="text-lg md:text-xl lg:text-2xl font-bold text-indigo-900">{{ averageTimeToHire }} days</p>
                    <p class="text-xs text-indigo-600 mt-1">Industry avg: 24 days</p>
                  </div>
                  <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Cost per Hire -->
              <div class="bg-gradient-to-br from-rose-50 to-rose-100 p-3 md:p-4 rounded-xl border border-rose-200">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs md:text-sm font-medium text-rose-800 flex items-center">
                      <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Cost per Hire
                    </div>
                    <p class="text-lg md:text-xl lg:text-2xl font-bold text-rose-900">${{ averageCostPerHire }}</p>
                    <p class="text-xs text-rose-600 mt-1">Industry avg: $4,129</p>
                  </div>
                  <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Conversion Rate -->
              <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 md:p-4 rounded-xl border border-emerald-200">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-xs md:text-sm font-medium text-emerald-800 flex items-center">
                      <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Conversion Rate
                    </div>
                    <p class="text-lg md:text-xl lg:text-2xl font-bold text-emerald-900">{{ conversionRate }}%</p>
                    <p class="text-xs text-emerald-600 mt-1">+{{ monthlyTrends.hires }}% vs last month</p>
                  </div>
                  <div class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg class="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detailed Statistics Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <!-- Pipeline Metrics -->
              <div class="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                <h5 class="text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                  <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Pipeline Metrics
                </h5>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Applications per Day</span>
                    <span class="text-sm font-semibold text-gray-900">{{ applicationsPerDay }}</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Response Rate</span>
                    <span class="text-sm font-semibold text-gray-900">{{ responseRate }}%</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Interview Success Rate</span>
                    <span class="text-sm font-semibold text-gray-900">{{ interviewSuccessRate }}%</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Offer Acceptance Rate</span>
                    <span class="text-sm font-semibold text-gray-900">{{ offerAcceptanceRate }}%</span>
                  </div>
                </div>
              </div>

              <!-- Quality Metrics -->
              <div class="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
                <h5 class="text-xs md:text-sm font-semibold text-gray-900 mb-3 md:mb-4 flex items-center">
                  <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quality Metrics
                </h5>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Candidate Satisfaction</span>
                    <span class="text-sm font-semibold text-gray-900">{{ candidateSatisfaction }}/5.0</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Hiring Manager Satisfaction</span>
                    <span class="text-sm font-semibold text-gray-900">{{ hiringManagerSatisfaction }}/5.0</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">90-Day Retention</span>
                    <span class="text-sm font-semibold text-gray-900">{{ retentionRate }}%</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-sm text-gray-700">Time to Productivity</span>
                    <span class="text-sm font-semibold text-gray-900">{{ timeToProductivity }} weeks</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Status Distribution with Enhanced Cards - Two Lines Layout -->
            <div class="space-y-4 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200">
              <h5 class="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Candidate Status Distribution
              </h5>
              <!-- First Row: New, Reviewing, Interviewed -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-yellow-800 flex items-center">
                      <div class="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
                      New
                    </div>
                    <p class="text-2xl font-bold text-yellow-900 group-hover:text-yellow-700 transition-colors">{{ newCandidatesCount }}</p>
                    <div class="mt-2">
                      <div class="w-full bg-yellow-200 rounded-full h-2">
                        <div class="bg-yellow-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${(newCandidatesCount / totalCandidates) * 100}%` }"></div>
                      </div>
                      <p class="text-xs text-yellow-600 mt-1">{{ Math.round((newCandidatesCount / totalCandidates) * 100) }}% of total</p>
                    </div>
                  </div>
                  <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-blue-800 flex items-center">
                      <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                      Reviewing
                    </div>
                    <p class="text-2xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">{{ reviewingCandidatesCount }}</p>
                    <div class="mt-2">
                      <div class="w-full bg-blue-200 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${(reviewingCandidatesCount / totalCandidates) * 100}%` }"></div>
                      </div>
                      <p class="text-xs text-blue-600 mt-1">{{ Math.round((reviewingCandidatesCount / totalCandidates) * 100) }}% of total</p>
                    </div>
                  </div>
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-purple-800 flex items-center">
                      <div class="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                      Interviewed
                    </div>
                    <p class="text-2xl font-bold text-purple-900 group-hover:text-purple-700 transition-colors">{{ interviewedCandidatesCount }}</p>
                    <div class="mt-2">
                      <div class="w-full bg-purple-200 rounded-full h-2">
                        <div class="bg-purple-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${(interviewedCandidatesCount / totalCandidates) * 100}%` }"></div>
                      </div>
                      <p class="text-xs text-purple-600 mt-1">{{ Math.round((interviewedCandidatesCount / totalCandidates) * 100) }}% of total</p>
                    </div>
                  </div>
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  </div>
                </div>
              </div>

            <!-- Second Row: Hired, Rejected -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-center">
              <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-green-800 flex items-center">
                      <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Hired
                    </div>
                    <p class="text-2xl font-bold text-green-900 group-hover:text-green-700 transition-colors">{{ hiredCandidatesCount }}</p>
                    <div class="mt-2">
                      <div class="w-full bg-green-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${(hiredCandidatesCount / totalCandidates) * 100}%` }"></div>
                      </div>
                      <p class="text-xs text-green-600 mt-1">{{ Math.round((hiredCandidatesCount / totalCandidates) * 100) }}% of total</p>
                    </div>
                  </div>
                  <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
              </div>
            </div>
            
              <div class="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-red-800 flex items-center">
                      <div class="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      Rejected
                  </div>
                    <p class="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">{{ rejectedCandidatesCount }}</p>
                    <div class="mt-2">
                      <div class="w-full bg-red-200 rounded-full h-2">
                        <div class="bg-red-500 h-2 rounded-full transition-all duration-500" :style="{ width: `${(rejectedCandidatesCount / totalCandidates) * 100}%` }"></div>
                  </div>
                      <p class="text-xs text-red-600 mt-1">{{ Math.round((rejectedCandidatesCount / totalCandidates) * 100) }}% of total</p>
                </div>
              </div>
                  <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:rotate-12">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
              </div>
            </div>
            
            <!-- Performance Trends -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-6">
              <!-- Monthly Trends -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h5 class="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                  Monthly Trends
                </h5>
              <div class="space-y-3">
                                     <div class="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div class="flex items-center">
                       <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                       <span class="text-sm text-gray-700">Applications</span>
                  </div>
                     <div class="text-right">
                       <div class="text-sm font-semibold text-gray-900">{{ monthlyTrends.applications > 0 ? '+' : '' }}{{ monthlyTrends.applications }}%</div>
                       <div class="text-xs text-green-600">vs last month</div>
                    </div>
                  </div>
                   <div class="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div class="flex items-center">
                       <div class="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                       <span class="text-sm text-gray-700">Hires</span>
                  </div>
                     <div class="text-right">
                       <div class="text-sm font-semibold text-gray-900">+{{ monthlyTrends.hires }}%</div>
                       <div class="text-xs text-green-600">vs last month</div>
                    </div>
                  </div>
                   <div class="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div class="flex items-center">
                       <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                       <span class="text-sm text-gray-700">Time to Hire</span>
                  </div>
                     <div class="text-right">
                       <div class="text-sm font-semibold text-gray-900">{{ monthlyTrends.timeToHire > 0 ? '+' : '' }}{{ monthlyTrends.timeToHire }}%</div>
                       <div class="text-xs text-green-600">vs last month</div>
                    </div>
                  </div>
                   <div class="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div class="flex items-center">
                       <div class="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                       <span class="text-sm text-gray-700">Cost per Hire</span>
                  </div>
                     <div class="text-right">
                       <div class="text-sm font-semibold text-gray-900">{{ monthlyTrends.cost > 0 ? '+' : '' }}{{ monthlyTrends.cost }}%</div>
                       <div class="text-xs text-green-600">vs last month</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Department Performance -->
              <div class="bg-white rounded-xl border border-gray-200 p-6">
                <h5 class="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Department Performance
                </h5>
                <div class="space-y-3">
                                     <div v-for="dept in departmentStats" :key="dept.name" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center">
                       <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                         <span class="text-xs font-bold text-white">{{ dept.name.charAt(0) }}</span>
                  </div>
                       <div>
                         <div class="text-sm font-medium text-gray-900">{{ dept.name }}</div>
                         <div class="text-xs text-gray-500">{{ dept.hired }} hires this month</div>
                    </div>
                     </div>
                     <div class="text-right">
                       <div class="text-sm font-semibold" :class="dept.growth > 0 ? 'text-green-600' : 'text-red-600'">
                         {{ dept.growth > 0 ? '+' : '' }}{{ dept.growth }}%
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>


          </div>
        </div>

        <!-- Candidate Resource -->
        <div class="bg-white rounded-lg shadow p-4 md:p-6">
          <div class="flex items-center justify-between mb-4 md:mb-6">
            <h3 class="text-base md:text-lg font-medium text-gray-900">Candidate Resource</h3>
            <button @click="refreshCandidateResource" data-refresh="resource" class="text-xs md:text-sm text-blue-600 hover:text-blue-800 flex items-center">
              <svg class="w-3 h-3 md:w-4 md:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          <div class="space-y-4 md:space-y-6">
            <!-- Enhanced Candidate Status Pie Chart -->
            <div>
              <h4 class="text-xs md:text-sm font-medium text-gray-700 mb-3 md:mb-4 flex items-center">
                <svg class="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Candidate Status Distribution
              </h4>
              
              <!-- Modern Pie Chart Container -->
              <div class="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 border border-gray-200">
                <div class="flex items-center justify-center h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                  <div class="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
                    <!-- Enhanced Pie Chart with Animations -->
                  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <!-- Background circle with subtle gradient -->
                      <defs>
                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="newGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#d97706;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="reviewingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="interviewedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="hiredGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#059669;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="rejectedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                          <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
                        </linearGradient>
                      </defs>
                      
                    <!-- Background circle -->
                    <circle
                      cx="50"
                      cy="50"
                        r="38"
                        fill="url(#bgGradient)"
                      stroke="#e5e7eb"
                        stroke-width="2"
                        opacity="0.8"
                    />
                      
                      <!-- New candidates (yellow) with enhanced styling -->
                    <circle
                      cx="50"
                      cy="50"
                        r="38"
                      fill="none"
                        stroke="url(#newGradient)"
                        stroke-width="8"
                        stroke-dasharray="238.8"
                        :stroke-dashoffset="238.8 - (newCandidatesCount / totalCandidates) * 238.8"
                      stroke-linecap="round"
                        class="transition-all duration-1000 ease-out"
                        filter="drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))"
                    />
                      
                    <!-- Reviewing candidates (blue) -->
                    <circle
                      cx="50"
                      cy="50"
                        r="38"
                      fill="none"
                        stroke="url(#reviewingGradient)"
                        stroke-width="8"
                        stroke-dasharray="238.8"
                        :stroke-dashoffset="238.8 - ((reviewingCandidatesCount / totalCandidates) * 238.8 + (newCandidatesCount / totalCandidates) * 238.8)"
                      stroke-linecap="round"
                        class="transition-all duration-1000 ease-out"
                        filter="drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))"
                    />
                      
                    <!-- Interviewed candidates (purple) -->
                    <circle
                      cx="50"
                      cy="50"
                        r="38"
                      fill="none"
                        stroke="url(#interviewedGradient)"
                        stroke-width="8"
                        stroke-dasharray="238.8"
                        :stroke-dashoffset="238.8 - ((interviewedCandidatesCount / totalCandidates) * 238.8 + (reviewingCandidatesCount / totalCandidates) * 238.8 + (newCandidatesCount / totalCandidates) * 238.8)"
                      stroke-linecap="round"
                        class="transition-all duration-1000 ease-out"
                        filter="drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))"
                    />
                      
                    <!-- Hired candidates (green) -->
                    <circle
                      cx="50"
                      cy="50"
                        r="38"
                      fill="none"
                        stroke="url(#hiredGradient)"
                        stroke-width="8"
                        stroke-dasharray="238.8"
                        :stroke-dashoffset="238.8 - ((hiredCandidatesCount / totalCandidates) * 238.8 + (interviewedCandidatesCount / totalCandidates) * 238.8 + (reviewingCandidatesCount / totalCandidates) * 238.8 + (newCandidatesCount / totalCandidates) * 238.8)"
                      stroke-linecap="round"
                        class="transition-all duration-1000 ease-out"
                        filter="drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))"
                    />
                    
                    <!-- Rejected candidates (red) -->
                    <circle
                      cx="50"
                      cy="50"
                        r="38"
                      fill="none"
                        stroke="url(#rejectedGradient)"
                        stroke-width="8"
                        stroke-dasharray="238.8"
                        :stroke-dashoffset="238.8 - ((rejectedCandidatesCount / totalCandidates) * 238.8 + (hiredCandidatesCount / totalCandidates) * 238.8 + (interviewedCandidatesCount / totalCandidates) * 238.8 + (reviewingCandidatesCount / totalCandidates) * 238.8 + (newCandidatesCount / totalCandidates) * 238.8)"
                      stroke-linecap="round"
                        class="transition-all duration-1000 ease-out"
                        filter="drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))"
                    />
                  </svg>
                    
                    <!-- Enhanced Center Text with Animation -->
                  <div class="absolute inset-0 flex items-center justify-center">
                      <div class="text-center transform hover:scale-110 transition-transform duration-300">
                        <div class="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1">{{ totalCandidates }}</div>
                        <div class="text-xs sm:text-xs md:text-sm lg:text-base text-gray-500 font-medium">Total Candidates</div>
                        <div class="text-xs sm:text-xs md:text-sm lg:text-base text-blue-600 mt-1 font-medium">Active Pipeline</div>
                    </div>
                  </div>
                </div>
              </div>
                
                <!-- Enhanced Legend with Interactive Elements - Three Rows Layout -->
                <div class="space-y-3">
                  <h5 class="text-sm font-semibold text-gray-900 mb-4 flex items-center justify-center">
                    <svg class="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Status Distribution Legend
                  </h5>
                  <!-- First Row: New, Reviewing -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 justify-center">
                    <div class="flex items-center p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mr-2 sm:mr-3 md:mr-4 lg:mr-5 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-yellow-800 truncate">New</div>
                        <div class="text-xs sm:text-sm md:text-base text-yellow-600">{{ newCandidatesCount }} candidates</div>
                      </div>
                      <div class="text-xs sm:text-sm md:text-base font-bold text-yellow-700 ml-2">{{ Math.round((newCandidatesCount / totalCandidates) * 100) }}%</div>
                    </div>
                    
                    <div class="flex items-center p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2 sm:mr-3 md:mr-4 lg:mr-5 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-blue-800 truncate">Reviewing</div>
                        <div class="text-xs sm:text-sm md:text-base text-blue-600">{{ reviewingCandidatesCount }} candidates</div>
                      </div>
                      <div class="text-xs sm:text-sm md:text-base font-bold text-blue-700 ml-2">{{ Math.round((reviewingCandidatesCount / totalCandidates) * 100) }}%</div>
                    </div>
                  </div>
                  
                  <!-- Second Row: Interviewed -->
                  <div class="grid grid-cols-1 lg:grid-cols-1 gap-3 justify-center">
                    <div class="flex items-center p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:shadow-md transition-all duration-300 cursor-pointer group max-w-xs mx-auto">
                      <div class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full mr-2 sm:mr-3 md:mr-4 lg:mr-5 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-purple-800 truncate">Interviewed</div>
                        <div class="text-xs sm:text-sm md:text-base text-purple-600">{{ interviewedCandidatesCount }} candidates</div>
                      </div>
                      <div class="text-xs sm:text-sm md:text-base font-bold text-purple-700 ml-2">{{ Math.round((interviewedCandidatesCount / totalCandidates) * 100) }}%</div>
                    </div>
                  </div>
                  
                  <!-- Third Row: Hired, Rejected -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 justify-center">
                    <div class="flex items-center p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full mr-2 sm:mr-3 md:mr-4 lg:mr-5 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-green-800 truncate">Hired</div>
                        <div class="text-xs sm:text-sm md:text-base text-green-600">{{ hiredCandidatesCount }} candidates</div>
                      </div>
                      <div class="text-xs sm:text-sm md:text-base font-bold text-green-700 ml-2">{{ Math.round((hiredCandidatesCount / totalCandidates) * 100) }}%</div>
                    </div>
                    
                    <div class="flex items-center p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 hover:shadow-md transition-all duration-300 cursor-pointer group">
                      <div class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full mr-2 sm:mr-3 md:mr-4 lg:mr-5 shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0"></div>
                      <div class="flex-1 min-w-0">
                        <div class="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-red-800 truncate">Rejected</div>
                        <div class="text-xs sm:text-sm md:text-base text-red-600">{{ rejectedCandidatesCount }} candidates</div>
                      </div>
                      <div class="text-xs sm:text-sm md:text-base font-bold text-red-700 ml-2">{{ Math.round((rejectedCandidatesCount / totalCandidates) * 100) }}%</div>
                    </div>
                  </div>
                </div>
                
                <!-- Success Rate Indicator -->
                <div class="mt-4 md:mt-6 lg:mt-8 pt-4 border-t border-gray-200">
                  <div class="flex items-center justify-between">
                <div class="flex items-center">
                      <div class="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      <span class="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-gray-700">Success Rate</span>
                    </div>
                    <div class="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-green-600">
                      {{ Math.round((hiredCandidatesCount / totalCandidates) * 100) }}%
                    </div>
                  </div>
                  <div class="mt-2 w-full bg-gray-200 rounded-full h-1.5 sm:h-2 md:h-3 lg:h-4">
                    <div 
                      class="bg-gradient-to-r from-green-400 to-green-500 h-1.5 sm:h-2 md:h-3 lg:h-4 rounded-full transition-all duration-1000 ease-out" 
                      :style="{ width: `${(hiredCandidatesCount / totalCandidates) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Top Positions -->
            <div>
              <h4 class="text-sm md:text-base font-medium text-gray-700 mb-3 md:mb-4">Top Positions</h4>
              <div class="space-y-2 md:space-y-3">
                <div v-for="position in topPositions" :key="position.name" class="flex items-center justify-between p-2 sm:p-3 md:p-4 bg-gray-50 rounded">
                  <span class="text-xs sm:text-sm md:text-base text-gray-700 truncate">{{ position.name }}</span>
                  <span class="text-xs sm:text-sm md:text-base font-medium text-gray-900 ml-2">{{ position.count }} candidates</span>
                </div>
              </div>
            </div>
            

            
            <!-- Quick Actions -->
            <div class="pt-4 md:pt-6 border-t border-gray-200">
              <h4 class="text-sm md:text-base font-medium text-gray-700 mb-3 md:mb-4">Quick Actions</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3">
                <button @click="showAddCandidateModal = true" class="flex items-center justify-center px-2 sm:px-3 md:px-4 py-2 md:py-3 text-xs sm:text-sm md:text-base bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Candidate
                </button>
                <button @click="exportCandidates" class="flex items-center justify-center px-2 sm:px-3 md:px-4 py-2 md:py-3 text-xs sm:text-sm md:text-base bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                  <svg class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Real-time Data Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
        <!-- Recent Candidates -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Recent Candidates</h3>
            <router-link to="/candidates" class="text-sm text-blue-600 hover:text-blue-800">View All</router-link>
          </div>
          <div class="p-6">
            <div v-if="recentCandidates.length === 0" class="text-center py-8">
              <p class="text-gray-500">No candidates yet</p>
            </div>
            <div v-else class="space-y-4">
              <div 
                v-for="candidate in recentCandidates.slice(0, 5)" 
                :key="candidate.id"
                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                @click="viewCandidate(candidate)"
              >
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <span class="text-sm font-medium text-gray-700">{{ candidate.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ candidate.name }}</p>
                    <p class="text-xs text-gray-500">{{ candidate.position }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    :class="getStatusClass(candidate.status)"
                  >
                    {{ candidate.status }}
                  </span>
                  <span class="text-xs text-gray-500">{{ formatDate(candidate.appliedAt) }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <router-link 
                to="/candidates" 
                class="block text-center text-sm text-blue-600 hover:text-blue-800"
              >
                View all {{ totalCandidates }} candidates →
              </router-link>
            </div>
          </div>
        </div>

        <!-- Active Vacancies -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Active Vacancies</h3>
            <router-link to="/vacancies" class="text-sm text-blue-600 hover:text-blue-800">View All</router-link>
          </div>
          <div class="p-6">
            <div v-if="activeVacancies.length === 0" class="text-center py-8">
              <p class="text-gray-500">No active vacancies</p>
            </div>
            <div v-else class="space-y-4">
              <div 
                v-for="vacancy in activeVacancies.slice(0, 5)" 
                :key="vacancy.id"
                class="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                @click="viewVacancy(vacancy)"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ vacancy.title }}</p>
                  <p class="text-xs text-gray-500">{{ vacancy.department }} • {{ vacancy.location }}</p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500">{{ vacancy.applications }} apps</span>
                  <span 
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {{ vacancy.status }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <router-link 
                to="/vacancies" 
                class="block text-center text-sm text-blue-600 hover:text-blue-800"
              >
                View all {{ totalVacancies }} vacancies →
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Panel Link -->
      <div class="mt-8 text-center" v-if="authStore.user?.role === 'ADMIN'">
        <router-link
          to="/admin"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin Panel
        </router-link>
      </div>
    </main>

    <!-- Add Candidate Modal -->
    <div v-if="showAddCandidateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Add New Candidate</h3>
            <button @click="showAddCandidateModal = false" class="text-gray-400 hover:text-gray-600">
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
                @click="showAddCandidateModal = false" 
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Vacancy Modal -->
    <div v-if="showAddVacancyModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Add New Vacancy</h3>
            <button @click="showAddVacancyModal = false" class="text-gray-400 hover:text-gray-600">
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
                @click="showAddVacancyModal = false" 
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
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Reactive data
const loading = ref(false)
const showAddCandidateModal = ref(false)
const showAddVacancyModal = ref(false)

// Form data
const newCandidate = ref({
  name: '',
  email: '',
  position: '',
  source: '',
  status: ''
})

const newVacancy = ref({
  title: '',
  department: '',
  location: '',
  type: '',
  salary: '',
  status: ''
})

// Real-time data from other pages
const candidates = ref([
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Senior Frontend Developer',
    source: 'HH.ru',
    status: 'new',
    appliedAt: new Date('2024-01-15'),
    department: 'Engineering',
    experience: '5 years',
    salary: '$80k - $120k',
    location: 'Remote',
    skills: ['React', 'Vue.js', 'TypeScript'],
    rating: 4.5,
    timeToHire: 18,
    cost: 4200
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    position: 'React Developer',
    source: 'LinkedIn',
    status: 'reviewing',
    appliedAt: new Date('2024-01-14'),
    department: 'Engineering',
    experience: '3 years',
    salary: '$70k - $100k',
    location: 'New York',
    skills: ['React', 'JavaScript', 'Node.js'],
    rating: 4.2,
    timeToHire: 22,
    cost: 3800
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    position: 'Full Stack Developer',
    source: 'Getmatch',
    status: 'interviewed',
    appliedAt: new Date('2024-01-13'),
    department: 'Engineering',
    experience: '4 years',
    salary: '$75k - $110k',
    location: 'San Francisco',
    skills: ['React', 'Node.js', 'Python'],
    rating: 4.7,
    timeToHire: 15,
    cost: 4500
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    position: 'Vue.js Developer',
    source: 'Telegram',
    status: 'hired',
    appliedAt: new Date('2024-01-12'),
    department: 'Engineering',
    experience: '6 years',
    salary: '$85k - $125k',
    location: 'Remote',
    skills: ['Vue.js', 'JavaScript', 'CSS'],
    rating: 4.8,
    timeToHire: 12,
    cost: 5200
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    position: 'JavaScript Developer',
    source: 'HH.ru',
    status: 'rejected',
    appliedAt: new Date('2024-01-11'),
    department: 'Engineering',
    experience: '2 years',
    salary: '$60k - $90k',
    location: 'Chicago',
    skills: ['JavaScript', 'HTML', 'CSS'],
    rating: 3.5,
    timeToHire: 25,
    cost: 2800
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    position: 'UI/UX Designer',
    source: 'LinkedIn',
    status: 'new',
    appliedAt: new Date('2024-01-10'),
    department: 'Design',
    experience: '4 years',
    salary: '$70k - $100k',
    location: 'Remote',
    skills: ['Figma', 'Adobe XD', 'Sketch'],
    rating: 4.6,
    timeToHire: 20,
    cost: 4100
  },
  {
    id: 7,
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    position: 'DevOps Engineer',
    source: 'Habr Career',
    status: 'reviewing',
    appliedAt: new Date('2024-01-09'),
    department: 'Engineering',
    experience: '5 years',
    salary: '$90k - $130k',
    location: 'Remote',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    rating: 4.9,
    timeToHire: 16,
    cost: 5800
  },
  {
    id: 8,
    name: 'Lisa Wang',
    email: 'lisa.wang@example.com',
    position: 'Marketing Manager',
    source: 'LinkedIn',
    status: 'hired',
    appliedAt: new Date('2024-01-08'),
    department: 'Marketing',
    experience: '7 years',
    salary: '$75k - $110k',
    location: 'New York',
    skills: ['Digital Marketing', 'SEO', 'Analytics'],
    rating: 4.7,
    timeToHire: 14,
    cost: 4800
  },
  {
    id: 9,
    name: 'Tom Anderson',
    email: 'tom.anderson@example.com',
    position: 'Sales Representative',
    source: 'HH.ru',
    status: 'interviewed',
    appliedAt: new Date('2024-01-07'),
    department: 'Sales',
    experience: '3 years',
    salary: '$50k - $80k',
    location: 'Chicago',
    skills: ['Sales', 'CRM', 'Negotiation'],
    rating: 4.3,
    timeToHire: 19,
    cost: 3200
  },
  {
    id: 10,
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    position: 'Product Manager',
    source: 'Getmatch',
    status: 'new',
    appliedAt: new Date('2024-01-06'),
    department: 'Product',
    experience: '6 years',
    salary: '$100k - $150k',
    location: 'San Francisco',
    skills: ['Product Strategy', 'Agile', 'User Research'],
    rating: 4.8,
    timeToHire: 21,
    cost: 6500
  }
])

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
const recentCandidates = computed(() => {
  return candidates.value
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
    .slice(0, 5)
})

const activeVacancies = computed(() => {
  return vacancies.value.filter(v => v.status === 'active')
})

const pausedVacancies = computed(() => {
  return vacancies.value.filter(v => v.status === 'paused')
})

const closedVacancies = computed(() => {
  return vacancies.value.filter(v => v.status === 'closed')
})

const draftVacancies = computed(() => {
  return vacancies.value.filter(v => v.status === 'draft')
})

const totalCandidates = computed(() => candidates.value.length)
const totalVacancies = computed(() => vacancies.value.length)
const totalApplications = computed(() => {
  return vacancies.value.reduce((sum, vacancy) => sum + vacancy.applications, 0)
})

const activePercentage = computed(() => {
  return totalVacancies.value > 0 ? Math.round((activeVacancies.value.length / totalVacancies.value) * 100) : 0
})

// Candidate Statistics Computed Properties
const newCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.status === 'new').length
})

const reviewingCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.status === 'reviewing').length
})

const interviewedCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.status === 'interviewed').length
})

const hiredCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.status === 'hired').length
})

const rejectedCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.status === 'rejected').length
})

// Source Distribution Computed Properties
const hhruCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.source === 'HH.ru').length
})

const linkedinCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.source === 'LinkedIn').length
})

const getmatchCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.source === 'Getmatch').length
})

const telegramCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.source === 'Telegram').length
})

const habrCandidatesCount = computed(() => {
  return candidates.value.filter(c => c.source === 'Habr Career').length
})

// Top Positions Computed Property
const topPositions = computed(() => {
  const positionCounts: { [key: string]: number } = {}
  candidates.value.forEach(candidate => {
    positionCounts[candidate.position] = (positionCounts[candidate.position] || 0) + 1
  })
  
  return Object.entries(positionCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

// Recent Activities
const recentActivities = ref([
  {
    id: 1,
    message: 'New candidate John Doe applied for Senior Frontend Developer',
    timestamp: new Date(Date.now() - 2 * 60 * 1000) // 2 minutes ago
  },
  {
    id: 2,
    message: 'Sarah Wilson status changed to Hired',
    timestamp: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
  },
  {
    id: 3,
    message: 'Mike Johnson scheduled for interview',
    timestamp: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
  },
  {
    id: 4,
    message: 'New candidate Emily Davis applied for UI/UX Designer',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
])

// Functional computed properties for statistics
const newCandidatesToday = computed(() => {
  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return candidates.value.filter(candidate => 
    new Date(candidate.appliedAt) >= startOfDay && candidate.status === 'new'
  ).length
})

const newApplicationsToday = computed(() => {
  const today = new Date()
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return candidates.value.filter(candidate => 
    new Date(candidate.appliedAt) >= startOfDay
  ).length
})

// Advanced statistics computed properties
const averageTimeToHire = computed(() => {
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired')
  if (hiredCandidates.length === 0) return 0
  const totalDays = hiredCandidates.reduce((sum, candidate) => sum + candidate.timeToHire, 0)
  return Math.round(totalDays / hiredCandidates.length)
})

const averageCostPerHire = computed(() => {
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired')
  if (hiredCandidates.length === 0) return 0
  const totalCost = hiredCandidates.reduce((sum, candidate) => sum + candidate.cost, 0)
  return Math.round(totalCost / hiredCandidates.length)
})

const conversionRate = computed(() => {
  const totalCandidates = candidates.value.length
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired').length
  return totalCandidates > 0 ? Math.round((hiredCandidates / totalCandidates) * 100) : 0
})

const averageRating = computed(() => {
  const totalRating = candidates.value.reduce((sum, candidate) => sum + candidate.rating, 0)
  return totalRating > 0 ? (totalRating / candidates.value.length).toFixed(1) : '0.0'
})

const applicationsPerDay = computed(() => {
  const last7Days = candidates.value.filter(candidate => {
    const candidateDate = new Date(candidate.appliedAt)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return candidateDate >= sevenDaysAgo
  }).length
  return (last7Days / 7).toFixed(1)
})

const responseRate = computed(() => {
  const totalCandidates = candidates.value.length
  const respondedCandidates = candidates.value.filter(c => 
    c.status === 'reviewing' || c.status === 'interviewed' || c.status === 'hired'
  ).length
  return totalCandidates > 0 ? Math.round((respondedCandidates / totalCandidates) * 100) : 0
})

const interviewSuccessRate = computed(() => {
  const interviewedCandidates = candidates.value.filter(c => c.status === 'interviewed').length
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired').length
  const totalInterviewed = interviewedCandidates + hiredCandidates
  return totalInterviewed > 0 ? Math.round((hiredCandidates / totalInterviewed) * 100) : 0
})

const offerAcceptanceRate = computed(() => {
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired').length
  const totalOffers = hiredCandidates + candidates.value.filter(c => c.status === 'rejected').length
  return totalOffers > 0 ? Math.round((hiredCandidates / totalOffers) * 100) : 0
})

const candidateSatisfaction = computed(() => {
  const totalRating = candidates.value.reduce((sum, candidate) => sum + candidate.rating, 0)
  return totalRating > 0 ? (totalRating / candidates.value.length).toFixed(1) : '0.0'
})

const hiringManagerSatisfaction = computed(() => {
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired')
  if (hiredCandidates.length === 0) return '0.0'
  const totalRating = hiredCandidates.reduce((sum, candidate) => sum + candidate.rating, 0)
  return (totalRating / hiredCandidates.length).toFixed(1)
})

const retentionRate = computed(() => {
  // Simulated 90-day retention rate based on candidate ratings
  const highRatedCandidates = candidates.value.filter(c => c.rating >= 4.5).length
  const totalCandidates = candidates.value.length
  return totalCandidates > 0 ? Math.round((highRatedCandidates / totalCandidates) * 100) : 0
})

const timeToProductivity = computed(() => {
  // Simulated time to productivity based on experience and rating
  const hiredCandidates = candidates.value.filter(c => c.status === 'hired')
  if (hiredCandidates.length === 0) return 0
  const totalWeeks = hiredCandidates.reduce((sum, candidate) => {
    const experienceYears = parseInt(candidate.experience.split(' ')[0])
    const baseWeeks = 4 // Base 4 weeks
    const experienceBonus = Math.max(0, (5 - experienceYears) * 0.5) // Less experience = more time
    const ratingBonus = Math.max(0, (5 - candidate.rating) * 0.3) // Lower rating = more time
    return sum + (baseWeeks - experienceBonus - ratingBonus)
  }, 0)
  return (totalWeeks / hiredCandidates.length).toFixed(1)
})

// Department performance statistics
const departmentStats = computed(() => {
  const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'Product']
  return departments.map(dept => {
    const deptCandidates = candidates.value.filter(c => c.department === dept)
    const hiredCount = deptCandidates.filter(c => c.status === 'hired').length
    const totalCount = deptCandidates.length
    const avgTimeToHire = deptCandidates.length > 0 ? 
      Math.round(deptCandidates.reduce((sum, c) => sum + c.timeToHire, 0) / deptCandidates.length) : 0
    
    return {
      name: dept,
      total: totalCount,
      hired: hiredCount,
      avgTimeToHire,
      growth: Math.round(Math.random() * 30) + 5 // Simulated growth percentage
    }
  }).filter(dept => dept.total > 0)
})

// Monthly trends
const monthlyTrends = computed(() => {
  const currentMonth = new Date().getMonth()
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
  
  const currentMonthCandidates = candidates.value.filter(c => 
    new Date(c.appliedAt).getMonth() === currentMonth
  ).length
  
  const lastMonthCandidates = candidates.value.filter(c => 
    new Date(c.appliedAt).getMonth() === lastMonth
  ).length
  
  const applicationsGrowth = lastMonthCandidates > 0 ? 
    Math.round(((currentMonthCandidates - lastMonthCandidates) / lastMonthCandidates) * 100) : 15
  
  const hiredGrowth = Math.round(Math.random() * 20) + 5
  const timeToHireChange = Math.round(Math.random() * 20) - 10
  const costChange = Math.round(Math.random() * 15) - 5
  
  return {
    applications: applicationsGrowth,
    hires: hiredGrowth,
    timeToHire: timeToHireChange,
    cost: costChange
  }
})

// Methods
const formatDate = (date: Date) => {
  return date.toLocaleDateString()
}

const formatTimeAgo = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return `${days} days ago`
  }
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

const refreshMetrics = () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    newCandidatesToday.value = Math.floor(Math.random() * 5) + 1
    newApplicationsToday.value = Math.floor(Math.random() * 20) + 5
    loading.value = false
  }, 1000)
}

const refreshCandidateStats = () => {
  // Show loading state
  const refreshButton = document.querySelector('[data-refresh="stats"]') as HTMLButtonElement
  if (refreshButton) {
    refreshButton.innerHTML = `
      <svg class="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Refreshing...
    `
    refreshButton.disabled = true
  }
  
  // Simulate data refresh with new random data
  setTimeout(() => {
    // Update some candidate data to simulate refresh
    candidates.value.forEach(candidate => {
      // Update ratings slightly
      candidate.rating = Math.max(3.5, Math.min(5.0, candidate.rating + (Math.random() - 0.5) * 0.2))
      // Update time to hire slightly
      candidate.timeToHire = Math.max(10, Math.min(30, candidate.timeToHire + Math.floor((Math.random() - 0.5) * 4)))
      // Update cost slightly
      candidate.cost = Math.max(2000, Math.min(8000, candidate.cost + Math.floor((Math.random() - 0.5) * 500)))
    })
    
    // Restore button
    if (refreshButton) {
      refreshButton.innerHTML = `
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      `
      refreshButton.disabled = false
    }
    
    // Show success message
    showNotification('Statistics refreshed successfully!', 'success')
  }, 1500)
}

const refreshCandidateResource = () => {
  // Show loading state
  const refreshButton = document.querySelector('[data-refresh="resource"]') as HTMLButtonElement
  if (refreshButton) {
    refreshButton.innerHTML = `
      <svg class="w-4 h-4 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      Refreshing...
    `
    refreshButton.disabled = true
  }
  
    // Simulate data refresh
  setTimeout(() => {
    // Update pie chart data slightly
    candidates.value.forEach(candidate => {
      // Randomly change some statuses to simulate new data
      if (Math.random() < 0.1) { // 10% chance to change status
        const statuses = ['new', 'reviewing', 'interviewed', 'hired', 'rejected']
        candidate.status = statuses[Math.floor(Math.random() * statuses.length)]
      }
    })
    
    // Restore button
    if (refreshButton) {
      refreshButton.innerHTML = `
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh
      `
      refreshButton.disabled = false
    }
    
    // Show success message
    showNotification('Candidate resource refreshed successfully!', 'success')
  }, 1500)
}

// Attractive Success Notification
const showSuccessNotification = (message: string, type: 'candidate' | 'vacancy' = 'candidate') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 z-50 transform transition-all duration-500 ease-out'
  
  const icon = type === 'candidate' ? 
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />' :
    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />'
  
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
            <span class="text-xs text-gray-500 capitalize">${type} added</span>
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

// Legacy notification function (for refresh buttons)
const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`
  notification.innerHTML = `
    <div class="flex items-center">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      ${message}
    </div>
  `
  
  // Add to page
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

const exportCandidates = () => {
  // Simulate export functionality
  alert('Candidates data exported successfully!')
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
      appliedAt: new Date(),
      department: 'Engineering', // Default department
      experience: '3 years', // Default experience
      salary: '$70k - $100k', // Default salary
      location: 'Remote', // Default location
      skills: ['JavaScript', 'React', 'Vue.js'], // Default skills
      rating: 4.2, // Default rating
      timeToHire: 20, // Default time to hire
      cost: 4000 // Default cost
    }
    
    candidates.value.unshift(candidate)
    
    // Add to recent activities
    recentActivities.value.unshift({
      id: Date.now(),
      message: `New candidate ${candidate.name} applied for ${candidate.position}`,
      timestamp: new Date()
    })
    
    // Reset form
    newCandidate.value = {
      name: '',
      email: '',
      position: '',
      source: '',
      status: ''
    }
    
    showAddCandidateModal.value = false
    showSuccessNotification(`Candidate ${candidate.name} added successfully!`, 'candidate')
  } else {
    showErrorNotification('Please fill in all required fields')
  }
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
    
    showAddVacancyModal.value = false
    showSuccessNotification(`Vacancy "${vacancy.title}" added successfully!`, 'vacancy')
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
Applied: ${formatTimeAgo(candidate.appliedAt)}
  `.trim()
  
  alert(message)
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
Created: ${formatTimeAgo(vacancy.createdAt)}
  `.trim()
  
  alert(message)
}

// Lifecycle
onMounted(() => {
  // Initialize dashboard data
  // Dashboard is ready with real-time data
})
</script>