<template>
  <div class="ref-input">
    <label
      class="ref-input__label"
      :for="labelId"
    >{{ label }}</label>
    <div class="ref-input__action">
      <input
        :id="labelId"
        class="ref-input__input"
        :type="type"
        :value="value"
        :readonly="readonly"
        @input="updateInput"
      >
      <button
        v-if="copy"
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="ref-input__copy"
      >
        Copy
      </button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component({
  name: 'LabelInputCopy',
  props: {
    type: String,
    labelId: String,
    label: String,
    value: String,
    copy: Boolean,
    readonly: Boolean,
  },
})
export default class LabelInputCopy extends Vue {
  @Emit('value-changed')
  updateInput(event: any): void {
    return event.target.value;
  }

  onCopy(e: any): void {
    console.log(`You just copied: ${e.text}`);
  }

  onError(): void {
    throw new Error('Failed to copy text.');
  }
}
</script>

<style lang="scss" scoped>
@import './_input.scss';
</style>
