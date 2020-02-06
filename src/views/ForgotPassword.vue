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
          @click.prevent="forgotPassword"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class forgotPassword extends Vue {
      email: string = '';

      back(e: Event): void {
        this.$router.push('login');
      }

      forgotPassword(e: Event): void {
        this.$store.dispatch('forgotPassword', this.email);
      }
}
</script>

<style lang="scss">
input {
  width: 300px;
  height: 40px;
  font-size: 16px;
}
</style>
