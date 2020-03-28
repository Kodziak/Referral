import storage from '@/mixins/storage';

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/pages/account/Login.vue'),
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
    component: () => import('@/components/pages/account/Register.vue'),
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
    component: () => import('@/components/pages/account/ForgotPassword.vue'),
  },
];
