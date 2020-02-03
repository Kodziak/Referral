import Vue from 'vue';
import VueRouter from 'vue-router';
import storageService from '../services/storage.service';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/error',
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../views/Error.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    // beforeEnter: (to: any, from: any, next: any) => {
    //   if (storageService.getUserData()) {
    //     next('/dashboard');
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    // beforeEnter: (to: any, from: any, next: any) => {
    //   if (storageService.getUserData()) {
    //     next('/dashboard');
    //   } else {
    //     next();
    //   }
    // },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPassword.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (storageService.getUserData()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
