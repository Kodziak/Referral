<template>
  <div class="dashboard">
    <h1>Secure dashboard</h1>

    <ref-menu />

    <div class="referrals">
      <ref-card
        v-for="(referral, index) in referrals"
        :key="index"
        :referral="referral"
        class="referrals__card"
      />
    </div>
  </div>
</template>

<script lang="ts">
// TODO: dashboard should be feed with:
// UserData and Referrals belongs to user, depends on this information - should create cards

// All data like 'Secure dashboard' is in data/ directory, maybe locales/ if I will create other language than en

// Move Ref-menu and Ref-card to organism, smth like: ReferralContainer

import { Component, Vue } from 'vue-property-decorator';

import * as NProgress from 'nprogress';
import * as firebase from 'firebase';

import RefMenu from '@/components/molecules/referral-menu/Menu.vue';
import RefCard from '@/components/organisms/referral-card/ReferralCard.vue';

import userMixin from '@/mixins/user';

@Component({
  name: 'DashboardTemplate',
  components: {
    RefMenu,
    RefCard,
  },
})
export default class DashboardTemplate extends Vue {
  referrals: firebase.firestore.DocumentData = [];
  user: firebase.User | null = null;

  async created() {
    this.user = await userMixin.getUser();
    this.getUser();
  }

  async getUser(): Promise<void> {
    await firebase.auth().onAuthStateChanged(async (usr) => {
      if (usr) {
        this.user = usr;
        await this.getReferrals();
        NProgress.done();
      }
    });
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

<style lang="scss" scoped>
.referrals {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  &__card {
    margin: 30px;
  }
}

</style>
