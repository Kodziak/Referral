<template>
  <div class="v-p-error">
    <h1><slot /></h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'ErrorTemplate',
})
export default class ErrorTemplate extends Vue {
}
</script>
