<template>
  <div>
    <div>
      <h4>Login</h4>
      <form class="login-form">
        <ref-label-input
          v-model="email"
          label-id="login-email"
          label="E-mail"
          type="email"
          @value-changed="updateEmail"
        />

        <ref-label-input
          v-model="password"
          label-id="login-password"
          label="Password"
          type="password"
          @value-changed="updatePassword"
        />
      </form>
    </div>

    <div class="buttons">
      <route-change
        v-for="(route, index) in routes"
        :key="index"
        :route="route"
      />
      <ref-button
        class="btn-menu"
        type="submit"
        @click.native="signIn"
      >
        Login
      </ref-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import RouteChange from '../components/buttons/RouteChange.vue';
import RefLabelInput from '@/components/inputs/RefLabelInput.vue';
import RefButton from '@/components/buttons/RefButton.vue';

@Component({
  components: {
    RefLabelInput,
    RouteChange,
    RefButton,
  },
})
export default class Login extends Vue {
  private email: string = '';
  private password: string = '';

  private routes = [{ target: '/', title: 'Back' }, { target: 'forgot-password', title: 'Forgot password' }]

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('dashboard');
      }
    });
  }

  updateEmail(value: string) {
    console.log('email', value);
    this.email = value;
  }

  updatePassword(value: string) {
    console.log('password', value);
    this.password = value;
  }

  signIn(): void {
    console.log('cred:', this.email, this.password);
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user): void => {
      this.$router.push('dashboard').catch((err) => {});
    }, (err): void => {
      console.log('Bad credentials');
    });
  }
}
</script>

<style lang="scss" scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.buttons {
  margin-top: 30px;
}
</style>
