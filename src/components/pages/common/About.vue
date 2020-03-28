<template>
  <v-t-about>
    This is an about page
  </v-t-about>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VTAbout from '@/components/templates/common/About.vue';

@Component({
  name: 'AboutPage',
  components: {
    VTAbout,
  },
})
export default class AboutPage extends Vue {
}
</script>
