<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p class="text-gray-600">Get in touch with our team for support, feedback, or inquiries</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Send us a message</h2>
            
            <form @submit.prevent="submitForm" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <select
                  v-model="form.subject"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  v-model="form.message"
                  rows="6"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ loading ? 'Sending...' : 'Send Message' }}
                </button>
              </div>
            </form>
          </div>

          <!-- Office Information -->
          <div class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Our Office</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-medium text-gray-900 mb-2">Headquarters</h3>
                <p class="text-sm text-gray-600 mb-1">123 Innovation Drive</p>
                <p class="text-sm text-gray-600 mb-1">Tech City, TC 12345</p>
                <p class="text-sm text-gray-600 mb-3">United States</p>
                
                <h3 class="font-medium text-gray-900 mb-2">Contact Information</h3>
                <p class="text-sm text-gray-600 mb-1">Phone: +1 (555) 123-4567</p>
                <p class="text-sm text-gray-600 mb-1">Email: info@corecruiter.com</p>
                <p class="text-sm text-gray-600">Fax: +1 (555) 123-4568</p>
              </div>
              
              <div>
                <h3 class="font-medium text-gray-900 mb-2">Business Hours</h3>
                <p class="text-sm text-gray-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p class="text-sm text-gray-600 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                <p class="text-sm text-gray-600 mb-3">Sunday: Closed</p>
                
                <h3 class="font-medium text-gray-900 mb-2">Emergency Support</h3>
                <p class="text-sm text-gray-600 mb-1">24/7 Technical Support</p>
                <p class="text-sm text-gray-600">support@corecruiter.com</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Contact -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Email Support</p>
                  <p class="text-sm text-gray-600">support@corecruiter.com</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Phone Support</p>
                  <p class="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="flex items-center">
                <svg class="w-5 h-5 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <div>
                  <p class="text-sm font-medium text-gray-900">Live Chat</p>
                  <p class="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Response Times -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Email Support</span>
                <span class="text-sm font-medium text-gray-900">24 hours</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Phone Support</span>
                <span class="text-sm font-medium text-gray-900">Immediate</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Live Chat</span>
                <span class="text-sm font-medium text-gray-900">5 minutes</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Bug Reports</span>
                <span class="text-sm font-medium text-gray-900">48 hours</span>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div class="space-y-3">
              <a href="#" class="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </a>
              <a href="#" class="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
                LinkedIn
              </a>
              <a href="#" class="flex items-center text-sm text-blue-600 hover:text-blue-800">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  loading.value = true
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.')
    
    // Reset form
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    alert('Failed to send message. Please try again.')
  } finally {
    loading.value = false
  }
}
</script> 