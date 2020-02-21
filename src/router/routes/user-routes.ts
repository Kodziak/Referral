import storage from '@/mixins/storage';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to: any, from: any, next: any): any => {
      if (storage.getData()) {
        next('/dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/register',
    name: 'register',
    component: (): any => import('@/views/Register.vue'),
    beforeEnter: (to: any, from: any, next: any): any => {
      if (storage.getData()) {
        next('/dashboard');
      } else {
        next();
      }
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/ForgotPassword.vue'),
  },
];
