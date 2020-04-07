import Vue from 'vue';
import { Router } from '@/types';

Vue.component('v-o-change-password', (): Router.ComponentImport => import('./change-password-modal/ChangePassword.vue'));
