<template>
  <div class="ref-menu">
    <v-a-button
      type="button"
      class="btn-menu"
      @click.native="showModal"
    >
      Add Referral
    </v-a-button>

    <referral-modal
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as firebase from 'firebase';

import { EventBus } from '@/utils/eventBus';

import VAButton from '@/components/atoms/button/Button.vue';
import ReferralModal from '@/components/modals/Referral.vue';

@Component({
  components: {
    VAButton,
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
