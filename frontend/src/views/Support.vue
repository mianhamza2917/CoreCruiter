<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Support</h1>
        <p class="text-gray-600">Get help with your recruitment platform</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Quick Help -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Help
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-blue-50 rounded-lg p-4">
                <h3 class="font-medium text-blue-900 mb-2">Getting Started</h3>
                <p class="text-sm text-blue-700 mb-3">Learn how to set up your account and start recruiting</p>
                <button class="text-blue-600 text-sm font-medium hover:text-blue-800">View Guide →</button>
              </div>
              
              <div class="bg-green-50 rounded-lg p-4">
                <h3 class="font-medium text-green-900 mb-2">Managing Candidates</h3>
                <p class="text-sm text-green-700 mb-3">Learn how to add, edit, and track candidates</p>
                <button class="text-green-600 text-sm font-medium hover:text-green-800">View Guide →</button>
              </div>
              
              <div class="bg-purple-50 rounded-lg p-4">
                <h3 class="font-medium text-purple-900 mb-2">Creating Vacancies</h3>
                <p class="text-sm text-purple-700 mb-3">Learn how to create and manage job postings</p>
                <button class="text-purple-600 text-sm font-medium hover:text-purple-800">View Guide →</button>
              </div>
              
              <div class="bg-orange-50 rounded-lg p-4">
                <h3 class="font-medium text-orange-900 mb-2">Account Settings</h3>
                <p class="text-sm text-orange-700 mb-3">Manage your profile and preferences</p>
                <button class="text-orange-600 text-sm font-medium hover:text-orange-800">View Guide →</button>
              </div>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Frequently Asked Questions
            </h2>
            
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg">
                <button class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50">
                  <span class="font-medium text-gray-900">How do I add a new candidate?</span>
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="px-4 pb-3">
                  <p class="text-gray-600">Go to the Candidates page and click the "Add Candidate" button. Fill in the required information and save.</p>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-lg">
                <button class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50">
                  <span class="font-medium text-gray-900">Can I export candidate data?</span>
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="px-4 pb-3">
                  <p class="text-gray-600">Yes, you can export candidate data in CSV format from the Candidates page using the export button.</p>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-lg">
                <button class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50">
                  <span class="font-medium text-gray-900">How do I change my password?</span>
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="px-4 pb-3">
                  <p class="text-gray-600">Go to your Profile page and use the "Change Password" section to update your password.</p>
                </div>
              </div>
              
              <div class="border border-gray-200 rounded-lg">
                <button class="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50">
                  <span class="font-medium text-gray-900">Is my data secure?</span>
                  <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div class="px-4 pb-3">
                  <p class="text-gray-600">Yes, we use industry-standard encryption and security measures to protect your data. See our Privacy Policy for details.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Support -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-medium text-gray-900 mb-2">Email Support</h3>
                <p class="text-sm text-gray-600 mb-3">Get help via email within 24 hours</p>
                <a href="mailto:support@corecruiter.com" class="text-blue-600 hover:text-blue-800 font-medium">support@corecruiter.com</a>
              </div>
              
              <div>
                <h3 class="font-medium text-gray-900 mb-2">Live Chat</h3>
                <p class="text-sm text-gray-600 mb-3">Chat with our support team</p>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Start Chat</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Support Status -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Platform</span>
                <span class="text-sm font-medium text-green-600">Operational</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Database</span>
                <span class="text-sm font-medium text-green-600">Operational</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">API</span>
                <span class="text-sm font-medium text-green-600">Operational</span>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div class="space-y-2">
              <router-link to="/help" class="block text-sm text-blue-600 hover:text-blue-800">Help Center</router-link>
              <router-link to="/contact" class="block text-sm text-blue-600 hover:text-blue-800">Contact Us</router-link>
              <router-link to="/privacy" class="block text-sm text-blue-600 hover:text-blue-800">Privacy Policy</router-link>
              <router-link to="/terms" class="block text-sm text-blue-600 hover:text-blue-800">Terms of Service</router-link>
            </div>
          </div>

          <!-- Resources -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <div class="space-y-3">
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">User Manual</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Video Tutorials</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">API Documentation</a>
              <a href="#" class="block text-sm text-blue-600 hover:text-blue-800">Release Notes</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Support page functionality can be added here
</script> 