import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import storage from '@/mixins/storage';

import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';
import infoRoutes from './routes/info-routes';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...userRoutes,
    ...authRoutes,
    ...infoRoutes,
  ],
});

router.beforeEach((to: any, from: any, next: any): void => {
  NProgress.start();
  if (to.matched.some((record: any): void => record.meta.requiresAuth)) {
    if (storage.getData()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

router.afterEach((): void => {
  NProgress.done();
});

export default router;
