<template>
  <div class="dashboard">
    <h1>Secure dashboard, welcome {{name}}</h1>
    <button type="submit" @click.prevent="signOut">Sign out</button>
    <button type="submit" @click.prevent="changePassword">Change password</button>
    <button type="submit" @click.prevent="addReferral">Add new referral</button>
    <li class="collection-item" v-for="referral in referrals" :key="referral.id">
      {{referral.title}} - {{referral.baseUrl}} - {{referral.referralUrl}} - {{referral.createdAt}}
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class Dashboard extends Vue {
  name: string | null = '';

  referrals: firebase.firestore.DocumentData = [];

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.email;
      } else {
        this.$router.push('/');
      }
    });

    this.getReferrals();
  }

  signOut(e: Event): void {
    firebase.auth().signOut();
    this.$router.push('/').catch((err: any) => {});
  }

  changePassword(e: Event): void {
    this.$router.push('/change-password');
  }

  addReferral(e: Event): void {
    this.$router.push('/add-new-referral');
  }

  async getReferrals(): Promise<void> {
    const user = firebase.auth().currentUser;

    if (user) {
      const refs = await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals');

      refs.onSnapshot((ref) => {
        this.referrals = [];
        ref.forEach((doc) => {
          const r = doc.data();
          r.id = doc.id;
          this.referrals.push(r);
        });
      });
    }
  }
}
</script>
