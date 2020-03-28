<template>
  <vue-template-about>
    This is an about page
  </vue-template-about>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueTemplateAbout from '@/components/templates/common/About.vue';

@Component({
  name: 'AboutPage',
  components: {
    VueTemplateAbout,
  },
})
export default class AboutPage extends Vue {
}
</script>
