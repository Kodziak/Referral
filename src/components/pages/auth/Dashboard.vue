<template>
  <div class="dashboard">
    <h1>Secure dashboard</h1>

    <ref-menu />
    <ref-cards />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RefMenu from '@/components/menu/RefMenu.vue';
import RefCards from '@/components/cards/RefCards.vue';

import userMixin from '@/mixins/user';

@Component({
  components: {
    RefCards,
    RefMenu,
  },
})
export default class Dashboard extends Vue {
  user: firebase.User | null = null;

  async created() {
    this.user = await userMixin.getUser();
  }
}
</script>
