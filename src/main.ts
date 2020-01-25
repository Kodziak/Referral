import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'referral-40d1a.firebaseapp.com',
  databaseURL: 'https://referral-40d1a.firebaseio.com',
  projectId: 'referral-40d1a',
  storageBucket: 'referral-40d1a.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
