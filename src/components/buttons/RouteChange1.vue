<template>
  <router-link
    class="btn"
    :to="to"
  >
    {{ title }}
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
@import './_button.scss';
</style>
