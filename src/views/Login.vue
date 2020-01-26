<template>
  <div>
    <h4>Login</h4>
    <form>
      <label for="email">Email</label>
      <div>
        <input id="email" type="email" v-model="email" required autofocus />
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <input id="password" type="password" v-model="password" required />
        </div>
      </div>
      <div>
        <button id="back" type="button" @click="back">Back</button>
        <button type="submit" @click="signIn">Login</button>
        <button type="submit" @click="forgotPassword">Forgot password</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class Login extends Vue {
      email: string = '';
      password: string = '';

      back(e: Event): void {
        e.preventDefault();
        this.$router.push('/');
      }

      signIn(e: Event): void {
        e.preventDefault();

        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user): void => {
          this.$router.push('dashboard');
        }, (err): void => {
          alert('Bad credentials');
        });
      }

      forgotPassword(e: Event): void {
        this.$router.push('forgot-password');
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
