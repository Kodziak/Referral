import firebase from 'firebase';
import { StoreOptions } from 'vuex';
import { AuthData, UserData } from '@/types/user';
import router from '@/router';

const user: StoreOptions<UserData> = {
  state: {
    uid: null,
    email: null,
  },

  getters: {
    userData: (state:any) => state,
  },

  mutations: {
    signIn(state: any, userData: UserData) {
      state.uid = userData.uid;
      state.email = userData.email;
    },

    signOut(state: any) {
      state.uid = null;
      state.email = null;
    },
  },

  actions: {
    signIn({ commit }, authData: AuthData) {
      firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
        .then((userData) => {
          if (userData.user && userData.user.emailVerified) {
            commit('signIn', {
              uid: userData.user.uid,
              email: userData.user.email,
            });
            router.push('/dashboard');
          } else {
            console.error('Verify your email');
          }
        }).catch((error) => {
          console.error(error.message);
        });
    },

    signUp({ commit }, authData: AuthData) {
      firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
        .then(() => {
          console.log('user registered');
        }).catch((error) => {
          console.error(error);
        });

      firebase.auth().onAuthStateChanged((usr) => {
        if (usr && !usr.emailVerified) {
          usr.sendEmailVerification().then(() => {
            console.log('email sent');
            router.push('/login');
          }).catch((error) => {
            console.error(error);
          });
        }
      });
    },

    signOut({ commit }) {
      commit('signOut');
      router.push('/').catch(() => {});
    },
  },
};

export default user;
