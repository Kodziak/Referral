<template>
  <div class="ref-menu">
    <ref-button
      type="button"
      class="btn-menu"
      title="Add referral"
      @click.native="showModal"
    />
    <referral-modal
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as firebase from 'firebase';

import RefButton from '@/components/buttons/RefButton.vue';
import ReferralModal from '@/components/modals/Referral.vue';

import { EventBus } from '../../utils/eventBus';

@Component({
  components: {
    RefButton,
    ReferralModal,
  },
})
export default class RefMenu extends Vue {
  isModalVisible = false;

  user: firebase.User | null = null;

  async mounted() {
    await this.getUser();
  }

  async getUser() {
    await firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        this.user = usr;
      }
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  @Watch('isModalVisible')
  closeModal() {
    EventBus.$on('closeModal', () => {
      this.isModalVisible = false;
    });
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
