import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import firebase from 'firebase';
import VuexPersist from 'vuex-persist';

import user from './modules/user';
import referral from './modules/referral';

Vue.use(Vuex);

const vuexStorage = new VuexPersist<RootState>({
  key: 'userData',
  storage: window.localStorage,
});

interface RootState {
  uid: firebase.User | null;
  email: string | null;
}

const store: StoreOptions<RootState> = {

  plugins: [vuexStorage.plugin],
  modules: {
    user,
    referral,
  },

};

export default new Vuex.Store<RootState>(store);
