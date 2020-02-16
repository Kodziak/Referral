<template>
  <div id="app">
    <navbar />
    <transition
      name="component-fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <!-- footer -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Navbar from '@/components/menu/Navbar.vue';

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  created() {
    if (!(this.$store.getters.userData
    && this.$store.getters.userData.uid
    && this.$store.getters.userData.email)) {
      const appData = JSON.stringify({
        user: {
          uid: null,
          email: null,
        },
      });
      localStorage.setItem('appData', appData);
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>
