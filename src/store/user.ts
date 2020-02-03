/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import firebase from 'firebase';
import VuexPersist, { VuexPersistence } from 'vuex-persist';
// import localForage from 'localforage';
import router from '../router/index';

Vue.use(Vuex);

const vuexStorage = new VuexPersist<RootState>({
  key: 'userData',
  storage: window.localStorage,
});

interface RootState {
  userUid: firebase.User | null;
  email: string | null;
}

const store: StoreOptions<RootState> = {

  plugins: [vuexStorage.plugin],

  state: {
    userUid: null,
    email: null,
  },

  getters: {
    user() {
      if (localStorage.getItem('userData')) {
        return JSON.parse(localStorage.getItem('userData')!);
      }
      return null;
    },
  },

  mutations: {
    login(state, user: { userUid: firebase.User | null; email: string | null }) {
      state.userUid = user.userUid;
      state.email = user.email;
    },

    logout(state) {
      state.userUid = null;
      state.email = null;
    },
  },

  actions: {
    login({ commit }, authData) {
      firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
        .then((user) => {
          commit('login', {
            userUid: user.user!.uid,
            email: user.user!.email,
          });

          router.push('/dashboard');
        }, (err) => {
          console.log('Bad credentials');
        });
    },

    logout({ commit }) {
      commit('logout');
      router.push('/');
    },
  },
};

export default new Vuex.Store<RootState>(store);
