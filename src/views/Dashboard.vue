<template>
  <div class="about">
    <h1>Secure dashboard</h1>
    <button type="submit" @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {

  methods: {
    signOut(e) {
      e.preventDefault();

      firebase.auth().signOut();
      this.$router.push('/');
    },
  },
};
</script>
