<template>
  <input
    :id="props.id"
    class="v-a-input"
    :type="props.type"
  >
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'VAInput',
  props: {
    id: String,
    type: String,
  },
})
export default class VAInput extends Vue {}
</script>

<style lang="scss" scoped>
  @import './_input.scss';
</style>
</template>
