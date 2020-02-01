<template>
  <div class="navbar">
    <ref-button
      type="button"
      class="btn-menu"
      @click.native="showModal"
    >
      Change password
    </ref-button>
    <change-password
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import RefButton from '@/components/buttons/RefButton.vue';
import ChangePassword from '@/components/modals/ChangePassword.vue';

@Component({
  components: {
    RefButton,
    ChangePassword,
  },
})
export default class Navbar extends Vue {
  isModalVisible = false;

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
