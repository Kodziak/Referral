import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import firebase from 'firebase';
import VuexPersist from 'vuex-persist';
import router from '../router/index';
import storageService from '../services/storage.service';

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

  state: {
    uid: null,
    email: null,
  },

  getters: {
    userData: () => storageService.getUserData(),
    userUid: state => state.uid,
  },

  mutations: {
    login(state, user: { uid: firebase.User | null; email: string | null }) {
      state.uid = user.uid;
      state.email = user.email;
    },

    logout(state) {
      state.uid = null;
      state.email = null;
    },
  },

  actions: {
    login({ commit }, authData) {
      firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
        .then((user) => {
          commit('login', {
            uid: user.user!.uid,
            email: user.user!.email,
          });

          router.push('/dashboard');
        }, (err) => {
          console.log('Bad credentials');
        });
    },

    logout({ commit }) {
      commit('logout');
      router.replace('/').catch(() => {});
    },
  },
};

export default new Vuex.Store<RootState>(store);
