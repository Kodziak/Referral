<template>
  <router-link
    class="btn-menu"
    :to="to"
  >
    {{ title }}
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'RouteChange',
  props: {
    to: String,
    title: String,
  },
})
export default class RouteChange extends Vue {}
</script>

<style lang="scss" scoped>
.btn-menu {
  all: unset;
  margin: 10px;
  padding: 5px 10px;
  border: 0.5px solid grey;
  cursor: pointer;
}
</style>
