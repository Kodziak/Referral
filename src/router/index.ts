import Vue from 'vue';
import VueRouter from 'vue-router';
import storageService from '../services/storage.service';

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
