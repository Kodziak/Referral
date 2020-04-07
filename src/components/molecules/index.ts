import Vue from 'vue';
import { Router } from '@/types';

Vue.component('v-m-label-input-copy', (): Router.ComponentImport => import('./label-input-copy/LabelInputCopy.vue'));
Vue.component('v-m-modal', (): Router.ComponentImport => import('./modal/Modal.vue'));
