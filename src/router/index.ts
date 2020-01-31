import Vue from 'vue';
import VueRouter from 'vue-router';
// import * as firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
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
      auth: true,
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
  {
    path: '/change-password',
    name: 'change-password',
    component: () => import('../views/ChangePassword.vue'),
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         next('dashboard');
//       } else {
//         next('/');
//       }
//     });
//   } else {
//     next();
//   }
// });

export default router;
