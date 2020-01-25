<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button type="submit" @click="handleSubmit">Login</button>
    <button type="submit" @click="gotoRegister">Register</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    async handleSubmit(e) {
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
