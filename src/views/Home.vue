<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button type="submit" @click="gotoLogin">Login</button>
    <button type="submit" @click="gotoRegister">Register</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    gotoLogin(e) {
      e.preventDefault();

      this.$router.push('login');
    },
    gotoRegister(e) {
      e.preventDefault();

      this.$router.push('register');
    },
  },
};
</script>
