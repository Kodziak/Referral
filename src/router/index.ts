import Vue from 'vue';
import VueRouter from 'vue-router';
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

router.beforeEach(async (to: any, from: any, next: any): Promise<any> => {
  if (to.matched.some((record: any): any => record.meta.requiresAuth)) {
    if (storage.getData()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
