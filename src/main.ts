import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueCookies from 'vue-cookies';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import storageService from '@/services/storage.service';
import './registerServiceWorker';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.use(VueClipboard);
Vue.use(VueCookies);

if (!storageService.getUserData()) {
  const values = JSON.stringify({
    uid: null,
    email: null,
  });
  localStorage.setItem('userData', values);
}


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
