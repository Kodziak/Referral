<template>
  <div class="ref-label-input">
    <label
      class="ref-label"
      :for="labelId"
    >{{ label }}</label>
    <div class="ref-actions">
      <input
        :id="labelId"
        class="ref-input"
        :type="type"
        :value="value"
        @input="updateInput"
      >
      <button
        v-if="copy"
        v-clipboard:copy="value"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="btn btn-copy ref-input-copy"
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
  name: 'RefInput',
  props: {
    type: String,
    labelId: String,
    label: String,
    value: String,
    copy: Boolean,
  },
})
export default class RefInput extends Vue {
@Emit('value-changed')
  updateInput(event: any) {
    return event.target.value;
  }

onCopy(e: any): void {
  console.log(`You just copied: ${e.text}`);
}

onError(e: Event): void {
  console.log('Failed to copy');
}
}
</script>

<style lang="scss" scoped>
.ref-label-input {
  .ref-label {
    color: black;
    margin-right: 20px;
  }

  .ref-actions {
    .ref-input {
      width: 200px;
      height: 20px;
      border: 1px solid green;
    }

    .ref-input-copy {
      vertical-align: top;
      line-height: 19px;
      width: 50px;
      border: 1px solid green;
      background: green;
      color: white;
    }
  }
}
</style>
