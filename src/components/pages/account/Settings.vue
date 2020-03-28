<template>
  <v-t-settings />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VTSettings from '@/components/templates/account/Settings.vue';

@Component({
  name: 'SettingsPage',
  components: {
    VTSettings,
  },
})
export default class SettingsPage extends Vue {
}
</script>
