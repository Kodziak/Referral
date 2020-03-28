<template>
  <v-t-home>
    This is an home page
  </v-t-home>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VTHome from '@/components/templates/common/Home.vue';

@Component({
  name: 'HomePage',
  components: {
    VTHome,
  },
})
export default class HomePage extends Vue {
}
</script>
