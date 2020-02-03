/* eslint-disable import/no-cycle */
import Vue from 'vue';
import firebase from 'firebase';
import VueRouter from 'vue-router';
import localforage from 'localforage';
import store from '../store/user';

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
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
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
    if (store.getters.userUid) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
