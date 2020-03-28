import Vue from 'vue';
import VueRouter, {
  Route, RouteRecord, RawLocation,
} from 'vue-router';
import * as NProgress from 'nprogress';

import userRoutes from './routes/user-routes';
import authRoutes from './routes/auth-routes';
import infoRoutes from './routes/info-routes';

import storage from '@/mixins/storage';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...userRoutes,
    ...authRoutes,
    ...infoRoutes,
  ],
});

router.beforeEach((to: Route, from: Route, next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void): void => {
  NProgress.start();
  if (to.matched.some((record: RouteRecord): void => record.meta.requiresAuth)) {
    if (storage.getData()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

router.afterEach((to: Route, from: Route): void => {
  if (!(to.matched.some((record: RouteRecord): void => record.meta.requiresAuth))) {
    NProgress.done();
  }
});

export default router;
