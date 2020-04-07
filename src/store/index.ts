import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import VuexPersist from 'vuex-persist';

import user from './modules/user';
import referral from './modules/referral';
import { User } from '@/types';

Vue.use(Vuex);

const vuexStorage = new VuexPersist<RootState>({
  key: 'appData',
  storage: window.localStorage,
});

interface RootState extends User.UserData {
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
