import Vue from 'vue';
import VueRouter from 'vue-router';

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
  },
  {
    path: '/add-new-referral',
    name: 'add-new-referral',
    component: () => import('../views/AddNewReferral.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (localStorage.getItem('jwt') == null) {
//       next({
//         path: '/',
//         params: { nextUrl: to.fullPath },
//       });
//     } else if (to.matched.some(record => record.meta.is_admin)) {
//       next({ name: 'dashboard' });
//     } else {
//       next();
//     }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     if (localStorage.getItem('jwt') == null) {
//       next();
//     } else {
//       next({ name: 'dashboard' });
//     }
//   } else {
//     next();
//   }
// });

export default router;
