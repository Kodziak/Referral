<template>
  <div class="ref-menu">
    <ref-button
      type="button"
      class="btn-menu"
      title="Open Modal"
      @click.native="showModal"
    />
    <add-referral
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import RefButton from '@/components/buttons/RefButton.vue';
import AddReferral from '@/components/modals/AddReferral.vue';

@Component({
  components: {
    RefButton,
    AddReferral,
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

  closeModal() {
    this.isModalVisible = false;
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
