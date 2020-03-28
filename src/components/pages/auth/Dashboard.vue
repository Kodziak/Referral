<template>
  <v-t-dashboard />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VTDashboard from '@/components/templates/auth/Dashboard.vue';

@Component({
  name: 'DashboardPage',
  components: {
    VTDashboard,
  },
})
export default class DashboardPage extends Vue {
}
</script>
