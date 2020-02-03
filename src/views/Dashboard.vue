<template>
  <div class="dashboard">
    <h1>Secure dashboard</h1>

    <ref-menu />
    <ref-cards />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

import RefMenu from '@/components/menu/RefMenu.vue';
import RefCards from '@/components/cards/RefCards.vue';

import userService from '@/services/user.service';

@Component({
  components: {
    RefCards,
    RefMenu,
  },
})
export default class Dashboard extends Vue {
  user: firebase.User | null = null;

  async created() {
    this.user = await userService.getUser();
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
}

</style>
