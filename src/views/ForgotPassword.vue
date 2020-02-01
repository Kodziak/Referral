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
          @click="back"
        >
          Back
        </button>
        <button
          type="submit"
          @click="forgotPassword"
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
        e.preventDefault();
        this.$router.push('login');
      }

      forgotPassword(e: Event): void {
        e.preventDefault();

        firebase.auth().sendPasswordResetEmail(this.email).then(() => {
          this.$router.push('/');
          // Email sent.
        }).catch((error) => {
          // An error happened.
        });
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
