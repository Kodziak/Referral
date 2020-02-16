<template>
  <button class="btn">
    {{ title }}
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'RefButton',
  props: {
    title: String,
  },
})
export default class RouteChange extends Vue {}
</script>

<style lang="scss" scoped>
@import './_button.scss';
</style>
