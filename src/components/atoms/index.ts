import Vue from 'vue';
import { Router } from '@/types';

Vue.component('v-a-button', (): Router.ComponentImport => import('./button/Button.vue'));
Vue.component('v-a-copy-button', (): Router.ComponentImport => import('./copy-button/CopyButton.vue'));
Vue.component('v-a-input', (): Router.ComponentImport => import('./input/Input.vue'));
Vue.component('v-a-label', (): Router.ComponentImport => import('./label/Label.vue'));

export default Vue;
