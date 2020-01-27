<template>
  <div>
    <h4>Psst... Wanna change some password?</h4>
    <form>
      <label for="new-password">New password</label>
      <div>
        <input id="new-password" type="password" v-model="password" required autofocus />
      </div>
      <div>
        <button id="back" type="button" @click.prevent="back">Back</button>
        <button type="submit" @click.prevent="changePassword">Change</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class ChangePassword extends Vue {
      password: string = '';

      back(e: Event): void {
        e.preventDefault();
        this.$router.push('login');
      }

      changePassword(e: Event): void {
        const user = firebase.auth().currentUser;
        if (user) {
          user.updatePassword(this.password).then(() => {
            console.log('Updated succesfull');
            this.$router.push('dashboard');
          }).catch((err) => {
            console.log(err);
          });
        }
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
