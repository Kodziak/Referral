<template>
  <div class="about">
    <h1>Secure dashboard, welcome {{name}}</h1>
    <button type="submit" @click="signOut">Sign out</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

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

  signOut(e: Event) {
    e.preventDefault();

    firebase.auth().signOut();
    this.$router.push('/');
  }
}
</script>
