<template>
  <div class="nav-bar">
    <div
      v-if="user.uid"
      class="nav-buttons"
    >
      <ref-button
        v-for="(button, index) in authButtons"
        :key="index"
        :type="button.type"
        :title="button.title"
        class="nav-button"
        @click.native="button.click"
      />
      <change-password
        v-show="isModalVisible"
        @close="closeModal"
      />
    </div>
    <div
      v-else
      class="nav-buttons"
    >
      <route-change
        v-for="(button, index) in buttons"
        :key="index"
        :to="button.target"
        :title="button.title"
        class="nav-button"
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
.nav-bar {
  width: 100%;
  min-height: 60px;
  background: grey;


  .nav-buttons {
    width: 90%;
    margin: auto;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .nav-button {
      margin: 0 10px;
      padding: 10px 20px;
      border: 1px solid black;
      background: white;
    }

  }
}
</style>
