<template>
  <div class="dashboard">
    <h1>Secure dashboard, welcome {{name}}</h1>
    <button type="submit" @click.prevent="signOut">Sign out</button>
    <button type="submit" @click.prevent="changePassword">Change password</button>
    <button type="submit" @click.prevent="addReferral">Add new referral</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class Dashboard extends Vue {
  name: string | null = '';

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.email;
      } else {
        this.$router.push('/');
      }
    });
  }

  signOut(e: Event): void {
    firebase.auth().signOut();
    this.$router.push('/').catch((err: any) => {});
  }

  changePassword(e: Event): void {
    this.$router.push('/change-password');
  }

  addReferral(e: Event): void {
    this.$router.push('/add-new-referral');
  }
}
</script>
