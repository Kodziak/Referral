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
    addReferral({ commit }: any, data: any): any {
      const { user, referral: referralNew } = data;

      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals')
        .add({
          title: referralNew.title,
          baseUrl: referralNew.baseUrl,
          referralUrl: referralNew.referralUrl,
          description: referralNew.description,
          createdAt: Date.now(),
        });
    },

    editReferral({ commit }: any, data: any): any {
      const { user, ref, referral: referralNew } = data;
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals')
        .doc(ref.id)
        .update({
          title: referralNew.title,
          baseUrl: referralNew.baseUrl,
          referralUrl: referralNew.referralUrl,
          description: referralNew.description,
        });
    },

    deleteReferral({ commit }, data: any): any {
      const { user, docId } = data;
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals')
        .doc(docId)
        .delete();
    },
  },
};

export default referral;
