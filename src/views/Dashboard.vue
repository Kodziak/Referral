<template>
  <div class="dashboard">
    <ref-button
      class="btn-menu"
      type="submit"
      @click.native="signOut"
    >
      Sign out
    </ref-button>

    <navbar />
    <h1>Secure dashboard</h1>

    <ref-menu />
    <ref-cards />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import RefButton from '@/components/buttons/RefButton.vue';
import RouteChange from '@/components/buttons/RouteChange.vue';

import Navbar from '@/components/menu/Navbar.vue';
import RefMenu from '@/components/menu/RefMenu.vue';
import RefCards from '@/components/cards/RefCards.vue';

@Component({
  components: {
    RefCards,
    RefMenu,

    Navbar,
    RefButton,
    RouteChange,
  },
})
export default class Dashboard extends Vue {
  signOut(): void {
    firebase.auth().signOut();
    this.$router.push('/').catch((err: any) => {});
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
