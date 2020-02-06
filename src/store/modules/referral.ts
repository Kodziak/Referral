import firebase from 'firebase';
import { StoreOptions } from 'vuex';

interface ReferralRootState {
    items: firebase.firestore.DocumentData;
  }

const referral: StoreOptions<ReferralRootState> = {
  state: {
    items: [],
  },

  getters: {
    getItems: state => state.items,
  },

  mutations: {
  },

  actions: {
    addReferral({ commit }: any, data: any) {
      firebase
        .firestore()
        .collection('users')
        .doc(data.user.uid)
        .collection('referrals')
        .add({
          title: data.referral.title,
          baseUrl: data.referral.baseUrl,
          referralUrl: data.referral.referralUrl,
          description: data.referral.description,
          createdAt: Date.now(),
        });
    },

    editReferral({ commit }:any, data: any) {
      firebase
        .firestore()
        .collection('users')
        .doc(data.user.uid)
        .collection('referrals')
        .doc(data.ref.id)
        .update({
          title: data.referral.title,
          baseUrl: data.referral.baseUrl,
          referralUrl: data.referral.referralUrl,
          description: data.referral.description,
        });
    },

    deleteReferral({ commit }, data: any) {
      firebase
        .firestore()
        .collection('users')
        .doc(data.user.uid)
        .collection('referrals')
        .doc(data.docId)
        .delete();
    },
  },
};

export default referral;
