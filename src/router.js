import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import reciept from './components/receipt.vue';
import splitTable from './components/splitTable.vue';
import register from './components/register.vue';
import home from './components/home.vue';
import signin from './components/sign-in.vue';

const auth = getAuth();

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement

  },
  {
    path: '/receipt',
    name: 'reciept',
    component: reciept,
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
  },
  {
    path: '/splitTable',
    name: 'splitTable',
    component: splitTable,
    meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
  },
  {
    path: '/register',
    name: 'register',
    component: register,
  },
  {
    path: '/signin',
    name: 'signin',
    component: signin,
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Global navigation guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check the user's authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in, proceed to the route
        next();
      } else {
        // User is not logged in, redirect to the login page
        next('/register'); // You can change the redirection path
      }
    });
  } else {
    // Route does not require authentication, proceed to the route
    next();
  }
});

export default router;
