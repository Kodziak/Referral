<template>
  <router-link
    v-if="to"
    class="v-a-btn"
    :to="to"
  >
    <slot />
  </router-link>
  <button
    v-else
    class="v-a-btn"
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
