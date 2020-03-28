<template>
  <div class="v-t-about">
    <h1><slot /></h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AboutTemplate',
})
export default class AboutTemplate extends Vue {
}
</script>
