<template>
  <v-t-register />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VTRegister from '@/components/templates/account/Register.vue';

@Component({
  name: 'RegisterPage',
  components: {
    VTRegister,
  },
})
export default class RegisterPage extends Vue {

}
</script>
