export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: (): any => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: (): any => import('@/views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
