<template>
  <div class="nav-bar">
    <div class="nav-buttons">
      <v-a-button
        v-for="(button, key) in buttons"

        v-show="(button.auth && user.uid) || (!button.auth && !user.uid)"
        :key="key"
        :type="button.type"
        :to="button.to"
        class="nav-button"

        @click.native="button.click ? button.click() : null"
      >
        {{ button.title }}
      </v-a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

import VAButton from '@/components/atoms/button/Button.vue';

@Component({
  components: {
    VAButton,
  },
})
export default class Navbar extends Vue {
  user: firebase.User | null = this.$store.getters.userData;
  isModalVisible = false;

  private buttons = [
    {
      title: 'Login',
      to: '/login',
      auth: false,
    }, {
      title: 'Register',
      to: '/register',
      auth: false,
    },
    {
      title: 'Dashboard',
      to: '/dashboard',
      auth: true,
    },
    {
      title: 'Settings',
      to: '/settings',
      auth: true,
    },
    {
      type: 'button',
      title: 'Sign out',
      click: this.signOut,
      auth: true,
    },
  ]

  async signOut(): Promise<void> {
    this.$store.dispatch('signOut');
  }
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
