import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import Candidates from '@/views/Candidates.vue'
import Vacancies from '@/views/Vacancies.vue'
import AdminPanel from '@/views/AdminPanel.vue'
import Profile from '@/views/Profile.vue'
import Settings from '@/views/Settings.vue'
import Support from '@/views/Support.vue'
import HelpCenter from '@/views/HelpCenter.vue'
import ContactUs from '@/views/ContactUs.vue'
import PrivacyPolicy from '@/views/PrivacyPolicy.vue'
import TermsOfService from '@/views/TermsOfService.vue'
import PersonalInfo from '@/views/PersonalInfo.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates,
    meta: { requiresAuth: true }
  },
  {
    path: '/vacancies',
    name: 'Vacancies',
    component: Vacancies,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { requiresAuth: true }
  },
  {
    path: '/support',
    name: 'Support',
    component: Support,
    meta: { requiresAuth: true }
  },
  {
    path: '/help',
    name: 'HelpCenter',
    component: HelpCenter,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component: ContactUs,
    meta: { requiresAuth: true }
  },
  {
    path: '/privacy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: { requiresAuth: true }
  },
  {
    path: '/terms',
    name: 'TermsOfService',
    component: TermsOfService,
    meta: { requiresAuth: true }
  },
  {
    path: '/personal-info',
    name: 'PersonalInfo',
    component: PersonalInfo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresAdmin && authStore.user?.role !== 'ADMIN') {
    next('/dashboard')
  } else {
    next()
  }
})

export default router 