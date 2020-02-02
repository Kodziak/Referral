<template>
  <div class="navbar">
    <div
      v-if="user"
      class="auth-nav"
    >
      <ref-button
        v-for="(button, index) in authButtons"
        :key="index"
        :type="button.type"
        :title="button.title"
        @click.native="button.click"
      />
      <change-password
        v-show="isModalVisible"
        @close="closeModal"
      />
    </div>
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
  user: firebase.User | null = null;

  created() {
    this.getUser();
  }

  async getUser() {
    await firebase.auth().onAuthStateChanged(async (usr) => {
      if (usr) {
        this.user = usr;
      } else {
        this.user = null;
      }
    });
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  signOut(): void {
    firebase.auth().signOut();
    this.getUser();
    this.$router.push('/').catch((err: any) => {});
  }

  authButtons = [{
    type: 'button',
    title: 'Change password',
    click: this.showModal,
  }, {
    type: 'button',
    title: 'Sign out',
    click: this.signOut,
  }]
}
</script>

<style lang="scss">
.referrals {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

</style>
