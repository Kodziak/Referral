import firebase from 'firebase';
import { StoreOptions } from 'vuex';
import router from '@/router';
import storageService from '@/services/storage.service';

interface UserRootState {
    uid: firebase.User | null;
    email: string | null;
  }

const user: StoreOptions<UserRootState> = {
  state: {
    uid: null,
    email: null,
  },

  getters: {
    userData: () => storageService.getUserData(),
    userUid: (state:any) => state.uid,
  },

  mutations: {
    login(state: any, userData: { uid: firebase.User | null; email: string | null }) {
      state.uid = userData.uid;
      state.email = userData.email;
    },

    logout(state: any) {
      state.uid = null;
      state.email = null;
    },
  },

  actions: {
    login({ commit }, authData: {email: string, password: string}) {
      firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
        .then((userData) => {
          commit('login', {
            uid: userData.user!.uid,
            email: userData.user!.email,
          });

          router.push('/dashboard');
        }, (err) => {
          console.log(err.message);
        });
    },

    logout({ commit }) {
      commit('logout');
      router.push('/').catch(() => {});
    },
  },
};

export default user;
