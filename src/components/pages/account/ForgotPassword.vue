<template>
  <v-t-forgot-password />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VTForgotPassword from '@/components/templates/account/ForgotPassword.vue';

@Component({
  name: 'ForgotPasswordPage',
  components: {
    VTForgotPassword,
  },
})
export default class ForgotPasswordPage extends Vue {
}
</script>
