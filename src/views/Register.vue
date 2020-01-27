<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="email">E-Mail</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="passwordConfirmation" required />
      </div>

      <div>
        <button id="back" type="button" @click.prevent="back">Back</button>
        <button type="submit" @click.prevent="register">Register</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class Register extends Vue {
      email: string = '';
      password: string = '';
      passwordConfirmation: string = '';

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
