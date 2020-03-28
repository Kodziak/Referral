<template>
  <v-t-login />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VTLogin from '@/components/templates/account/Login.vue';

@Component({
  name: 'LoginPage',
  components: {
    VTLogin,
  },
})
export default class LoginPage extends Vue {

}
</script>
