<template>
  <div class="home">
    HomePage
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
.home {
  margin: 10px;
}
</style>
