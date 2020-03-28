export default [
  {
    path: '*',
    redirect: '/error',
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('@/components/pages/common/Error.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/pages/common/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/pages/common/About.vue'),
  },
];
