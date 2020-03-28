<template>
  <div class="v-p-home">
    <h1><slot /></h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'HomeTemplate',
})
export default class HomeTemplate extends Vue {
}
</script>


<style lang="scss" scoped>
.v-p-home {
  margin: 10px;
}
</style>
