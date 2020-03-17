<template>
  <router-link
    v-if="to"
    class="btn"
    :to="to"
  >
    <slot />
  </router-link>
  <button
    v-else
    class="btn"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'BaseButton',
  props: {
    to: String,
  },
})
export default class BaseButton extends Vue {}
</script>

<style lang="scss" scoped>
@import './_button.scss';
</style>
