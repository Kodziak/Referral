<template>
  <v-t-error>
    Error 404
  </v-t-error>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VTError from '@/components/templates/common/Error.vue';

@Component({
  name: 'AboutPage',
  components: {
    VTError,
  },
})
export default class AboutPage extends Vue {
}
</script>
