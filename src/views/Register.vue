<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="email">E-Mail</label>
      <div>
        <input
          id="email"
          v-model="email"
          type="email"
          required
        >
      </div>

      <label for="password">Password</label>
      <div>
        <input
          id="password"
          v-model="password"
          type="password"
          required
        >
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input
          id="password-confirm"
          v-model="passwordConfirmation"
          type="password"
          required
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
          @click.prevent="signUp"
        >
          Sign up
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import { AuthData } from '../types/user';

import userService from '@/services/user.service';

@Component
export default class Register extends Vue {
  private email: string = '';
  private password: string = '';
  private passwordConfirmation: string = '';

  back(e: Event): void {
    this.$router.push('/');
  }

  signUp(e: Event): void {
    if (this.password === this.passwordConfirmation && this.email !== '' && this.password !== '') {
      const data: AuthData = {
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      };

      this.$store.dispatch('signUp', data);
    } else {
      console.log('Empty credentials');
    }
  }
}
</script>
