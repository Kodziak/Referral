<template>
  <div class="home">
    <RouteChange v-for="route in routes" :key="route" :route="route" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RouteChange from '../components/buttons/RouteChange.vue';

@Component({
  components: {
    RouteChange,
  },
})
export default class Home extends Vue {
  routes: {target: string; title: string}[] = [{ target: 'login', title: 'Login' }, { target: 'register', title: 'Register' }]
}
</script>
