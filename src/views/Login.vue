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
      <div class="buttons">
        <RouteChange v-for="route in routes" :key="route" :route="route" />
        <button class="btn-menu" type="submit" @click.prevent="signIn">Login</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import RouteChange from '../components/buttons/RouteChange.vue';

@Component({
  components: {
    RouteChange,
  },
})
export default class Login extends Vue {
      email: string = '';
      password: string = '';

      routes = [{ target: '/', title: 'Back' }, { target: 'forgot-password', title: 'Forgot password' }]

      created() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.$router.push('dashboard');
          }
        });
      }

      signIn(e: Event): void {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user): void => {
          this.$router.push('dashboard');
        }, (err): void => {
          alert('Bad credentials');
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

.buttons {
  margin-top: 30px;
}
</style>
