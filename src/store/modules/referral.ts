import firebase from 'firebase';
import { StoreOptions } from 'vuex';

interface ReferralRootState {
    items: [];
  }

const referral: StoreOptions<ReferralRootState> = {
  state: {
    items: [],
  },

  getters: {
    getItems: state => state.items,
  },

  mutations: {
    addReferral(state: any, element: {}) {
      state.items.push(element);
    },
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

      commit('addReferral', data.referral);
    },
  },
};

export default referral;
