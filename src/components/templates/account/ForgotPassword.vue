<template>
  <div>
    <h4>Forgot password?</h4>
    <form>
      <label for="email">Email</label>
      <div>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          autofocus
        >
      </div>
      <div>
        <button
          id="back"
          type="button"
          @click.prevent="back"
        >
          Back
        </button>
        <button
          type="submit"
          @click.prevent="dispatchForgotPassword"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'ForgotPasswordTemplate',
})
export default class ForgotPasswordTemplate extends Vue {
  private email: string = '';

  back(): void {
    this.$router.push('login');
  }

  dispatchForgotPassword(): void {
    this.$store.dispatch('forgotPassword', this.email);
  }
}
</script>

<style lang="scss" scoped>
input {
  width: 300px;
  height: 40px;
  font-size: 16px;
}
</style>
