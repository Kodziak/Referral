<template>
  <div class="referrals">
    <ref-card
      v-for="(referral, index) in referrals"
      :key="index"
      :referral="referral"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import RefCard from './RefCard.vue';

@Component({
  components: {
    RefCard,
  },
})
export default class RefCards extends Vue {
  referrals: firebase.firestore.DocumentData = [];
  user: firebase.User | null = null;

  created() {
    this.getUser();
  }

  async getUser() {
    await firebase.auth().onAuthStateChanged(async (usr) => {
      if (usr) {
        this.user = usr;
        await this.getReferrals();
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

<style lang="scss">
.referrals {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
