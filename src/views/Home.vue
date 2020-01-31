<template>
  <div class="home">
    <route-change v-for="(route, index) in routes" :key="index" :route="route" />
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
