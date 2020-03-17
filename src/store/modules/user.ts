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
    userData: (state: UserData): UserData => state,
    currentUser: (): firebase.User | null => firebase.auth().currentUser,
  },

  mutations: {
    SIGN_IN(state: UserData, userData: UserData): void {
      state.uid = userData.uid;
      state.email = userData.email;
    },

    SIGN_OUT(state: UserData): void {
      state.uid = null;
      state.email = null;
    },
  },

  actions: {
    signIn({ commit }, authData: AuthData): void {
      const { email, password } = authData;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userData): void => {
          if (userData.user && userData.user.emailVerified) {
            commit('SIGN_IN', {
              uid: userData.user.uid,
              email: userData.user.email,
            });
            router.push('/dashboard');
          } else {
            console.error('Verify your email');
          }
        }).catch((error: Error): void => {
          console.error(error.message);
        });
    },

    signUp({ commit }, authData: AuthData): void {
      const { email, password } = authData;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((): void => {
          console.log('user registered');
        }).catch((error: Error): void => {
          console.error(error);
        });

      firebase.auth().onAuthStateChanged((usr): void => {
        if (usr && !usr.emailVerified) {
          usr.sendEmailVerification().then((): void => {
            console.log('email sent');
            router.push('/login');
          }).catch((error: Error): void => {
            console.error(error);
          });
        }
      });
    },

    signOut({ commit }): void {
      commit('SIGN_OUT');
      router.push('/').catch((): void => {});
    },

    changePassword({ commit }, password): void {
      if (this.getters.currentUser) {
        this.getters.currentUser.updatePassword(password).then((): void => {
          console.log('Updated succesfull');
        }).catch((err: Error): void => {
          console.log(err);
        });
      }
    },

    forgotPassword({ commit }, email): void {
      firebase.auth().sendPasswordResetEmail(email).then((): void => {
        router.push('/');
      }).catch((error: Error): void => {
        console.error(error);
      });
    },

  },
};

export default user;
