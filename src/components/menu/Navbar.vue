<template>
  <div class="navbar">
    <div
      v-if="user.uid"
      class="nav"
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
    <div
      v-else
      class="nav"
    >
      <route-change
        v-for="(button, index) in buttons"
        :key="index"
        :to="button.target"
        :title="button.title"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

import RouteChange from '@/components/buttons/RouteChange.vue';
import RefButton from '@/components/buttons/RefButton.vue';
import ChangePassword from '@/components/modals/ChangePassword.vue';

import userService from '@/services/user.service';

@Component({
  components: {
    RouteChange,
    RefButton,
    ChangePassword,
  },
})
export default class Navbar extends Vue {
  user: firebase.User | null = this.$store.getters.userData;
  isModalVisible = false;

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  async signOut(): Promise<void> {
    this.$store.dispatch('signOut');
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

  buttons = [{
    title: 'Login',
    target: '/login',
  }, {
    title: 'Register',
    target: '/register',
  }]
}
</script>

<style lang="scss" scoped>
.navbar {
  margin: 20px;
}
</style>
