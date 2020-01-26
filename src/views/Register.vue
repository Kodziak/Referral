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
        <button id="back" type="button" @click="back">Back</button>
        <button type="submit" @click="register">Register</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

export default class Register extends Vue {
      email = '';

      password = '';

      passwordConfirmation = '';

      back(e: Event): void {
        e.preventDefault();
        this.$router.push('/');
      }

      register(e: Event): void {
        e.preventDefault();

        if (this.password === this.passwordConfirmation && this.email !== '' && this.password !== '') {
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
            this.$router.push('dashboard');
          }, (err) => {
            alert('Bad credentials');
          });
        } else {
          alert('Put credentials');
        }
      }
}
</script>
