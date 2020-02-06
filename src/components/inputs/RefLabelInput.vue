<template>
  <div class="ref-label-input">
    <label
      class="ref-label"
      :for="labelId"
    >{{ label }}</label>
    <input
      :id="labelId"
      class="ref-input"
      :type="type"
      @input="updateInput"
    >
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
  },
})
export default class RefInput extends Vue {
@Emit('value-changed')
  updateInput(event: any) {
    return event.target.value;
  }
}
</script>

<style lang="scss" scoped>
.ref-label-input {
  .ref-label {
    color: black;
    margin-right: 20px;
  }

  .ref-input {
    width: 200px;
    height: 20px;
  }
}
</style>
