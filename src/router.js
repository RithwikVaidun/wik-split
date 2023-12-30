// router.js
/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import reciept from './components/receipt.vue';
import splitTable from './components/splitTable.vue';
import register from './components/register.vue';


const routes = [
  // Define your routes here
  {
    path: '/',
    name: 'reciept',
    component: reciept
  },
  {
    path: '/splitTable',
    name: 'splitTable',
    component: splitTable, 
  },
  {
    path: '/register',
    name: 'register',
    component: register, 
  },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
  });

export default router;
