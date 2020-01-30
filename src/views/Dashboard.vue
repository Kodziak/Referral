<template>
  <div class="dashboard">
    <h1>Secure dashboard, welcome {{name}}</h1>
    <button type="submit" @click.prevent="signOut">Sign out</button>
    <button type="submit" @click.prevent="changePassword">Change password</button>
    <button type="submit" @click.prevent="addReferral">Add new referral</button>
    <div class="referrals">
      <ReferralCard v-for="referral in referrals" :key="referral.id" :referral="referral" />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import ReferralCard from '../components/ReferralCard.vue';

@Component({
  components: {
    ReferralCard,
  },
})
export default class Dashboard extends Vue {
  name: string | null = '';
  referrals: firebase.firestore.DocumentData = [];

  user = firebase.auth().currentUser;

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.email;
        this.getReferrals();
      } else {
        this.$router.push('/');
      }
    });
  }

  signOut(): void {
    firebase.auth().signOut();
    this.$router.push('/').catch((err: any) => {});
  }

  changePassword(): void {
    this.$router.push('/change-password');
  }

  addReferral(): void {
    this.$router.push('/add-new-referral');
  }

  async getReferrals(): Promise<void> {
    if (this.user) {
      const refs = await firebase
        .firestore()
        .collection('users')
        .doc(this.user.uid)
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

<style lang="scss">
.referrals {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>
