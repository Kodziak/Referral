export default [
  {
    path: '*',
    redirect: '/error',
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/views/Error.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
  },
];
