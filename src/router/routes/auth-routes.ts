import { Router } from '@/types';

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: (): Router.ComponentImport => import('@/components/pages/auth/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: (): Router.ComponentImport => import('@/components/pages/account/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
