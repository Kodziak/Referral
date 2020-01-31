import * as firebase from 'firebase';

export default class ReferralService {
  readonly user: firebase.User | null;

  constructor() {
    this.user = firebase.auth().currentUser;
  }

  addReferral(referral: {title: string; url: string; baseUrl: string; description: string}) {
    console.log(referral);
    console.log(this.user);
    if (this.user && referral.title !== '' && referral.baseUrl !== '' && referral.url !== '' && referral.description !== '') {
      firebase
        .firestore()
        .collection('users')
        .doc(this.user.uid)
        .collection('referrals')
        .add({
          title: referral.title,
          baseUrl: referral.baseUrl,
          referralUrl: referral.url,
          description: referral.description,
          createdAt: Date.now(),
        });
    }
  }

  // async getReferrals(): Promise<firebase.firestore.DocumentData> {
  //   const referrals: firebase.firestore.DocumentData = [];

  //   if (this.user) {
  //     const refs = await firebase
  //       .firestore()
  //       .collection('users')
  //       .doc(this.user.uid)
  //       .collection('referrals');

  //     refs.onSnapshot((ref) => {
  //       ref.forEach((doc) => {
  //         const r = doc.data();
  //         r.id = doc.id;
  //         referrals.push(r);
  //       });
  //     });
  //   }
  //   return referrals;
  // }
}
