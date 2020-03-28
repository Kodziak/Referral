export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/components/pages/auth/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/components/pages/account/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
