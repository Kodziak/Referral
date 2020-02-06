import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import firebase from 'firebase';
import VuexPersist from 'vuex-persist';

import { UserData } from '@/types/user';
import user from './modules/user';
import referral from './modules/referral';

Vue.use(Vuex);

const vuexStorage = new VuexPersist<RootState>({
  key: 'appData',
  storage: window.localStorage,
});

interface RootState extends UserData {
  items: [];
}

// const store: StoreOptions<RootState> = {
const store: any = {
  plugins: [vuexStorage.plugin],
  modules: {
    user,
    referral,
  },

};

export default new Vuex.Store<RootState>(store);
