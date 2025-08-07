<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p class="text-gray-600">Find answers to all your questions about Corecruiter</p>
      </div>

      <div class="mb-8">
        <div class="max-w-2xl mx-auto">
          <div class="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg class="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div class="lg:col-span-3 space-y-8">
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Getting Started</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-gray-900 mb-2">1. Create Your Account</h3>
                <p class="text-sm text-gray-600 mb-3">Sign up for a Corecruiter account and complete your profile setup.</p>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• Fill in your personal information</li>
                  <li>• Add your company details</li>
                  <li>• Set up your preferences</li>
                </ul>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <h3 class="font-semibold text-gray-900 mb-2">2. Add Your First Candidate</h3>
                <p class="text-sm text-gray-600 mb-3">Start building your candidate database by adding your first candidate.</p>
                <ul class="text-sm text-gray-600 space-y-1">
                  <li>• Go to the Candidates page</li>
                  <li>• Click "Add Candidate"</li>
                  <li>• Fill in candidate details</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Feature Guides</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 class="font-semibold text-gray-900 mb-2">Candidate Management</h3>
                <p class="text-sm text-gray-600 mb-3">Learn how to effectively manage your candidate database.</p>
                <a href="#" class="text-blue-600 text-sm font-medium hover:text-blue-800">Read Guide →</a>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 class="font-semibold text-gray-900 mb-2">Vacancy Creation</h3>
                <p class="text-sm text-gray-600 mb-3">Create compelling job postings that attract top talent.</p>
                <a href="#" class="text-blue-600 text-sm font-medium hover:text-blue-800">Read Guide →</a>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 class="font-semibold text-gray-900 mb-2">Dashboard Analytics</h3>
                <p class="text-sm text-gray-600 mb-3">Understand your recruitment metrics and insights.</p>
                <a href="#" class="text-blue-600 text-sm font-medium hover:text-blue-800">Read Guide →</a>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <router-link to="/support" class="block text-sm text-blue-600 hover:text-blue-800">Contact Support</router-link>
              <router-link to="/contact" class="block text-sm text-blue-600 hover:text-blue-800">Send Feedback</router-link>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Request Feature</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Report Bug</a>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
            <div class="space-y-3">
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">How to export candidate data</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Setting up email notifications</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Understanding the dashboard</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Managing user permissions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Help Center page functionality
</script> 