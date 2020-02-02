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
          @click.prevent="register"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

import userService from '@/services/user.service';

@Component
export default class Register extends Vue {
  private email: string = '';
  private password: string = '';
  private passwordConfirmation: string = '';

  private user: firebase.User | null = null;

  async created() {
    this.user = await userService.getUser();
    if (this.user) {
      this.$router.push('/dashboard');
    }
  }

  back(e: Event): void {
    this.$router.push('/');
  }

  register(e: Event): void {
    if (this.password === this.passwordConfirmation && this.email !== '' && this.password !== '') {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.push('dashboard');
      }, (err) => {
        console.log(err);
      });
    } else {
      console.log('Empty credentials');
    }
  }
}
</script>
