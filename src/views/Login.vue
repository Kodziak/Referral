<template>
  <div>
    <div>
      <h4>Login</h4>
      <form class="login-form">
        <div class="ref-input">
          <label
            for="email"
            class="ref-input__label"
          >E-Mail</label>

          <input
            id="email"
            v-model="form.email"
            class="ref-input__input"
            type="email"
            required
            @value-changed="updateEmail"
          >
        </div>

        <div class="ref-input">
          <label
            for="password"
            class="ref-input__label"
          >Password</label>

          <input
            id="password"
            v-model="form.password"
            class="ref-input__input"
            type="password"
            required
            @value-changed="updatePassword"
          >
        </div>
      </form>
    </div>

    <div class="buttons">
      <route-change
        v-for="(route, index) in routes"
        :key="index"
        :to="route.target"
        :title="route.title"
      />
      <ref-button
        class="btn-menu"
        type="submit"
        title="Login"
        @click.native="signIn"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RouteChange from '../components/buttons/RouteChange.vue';
import RefButton from '@/components/buttons/RefButton.vue';

@Component({
  components: {
    RouteChange,
    RefButton,
  },
})
export default class Login extends Vue {
  private form: {email: null | string; password: null | string} = {
    email: null,
    password: null,
  }

  private user: firebase.User | null = this.$store.getters.userData;

  private routes = [{ target: '/', title: 'Back' }, { target: '/forgot-password', title: 'Forgot password' }]

  updateEmail(value: string) {
    this.form.email = value;
  }

  updatePassword(value: string) {
    this.form.password = value;
  }

  private inputs = [{
    vmodel: this.form.email,
    id: 'login-email',
    label: 'E-mail',
    type: 'email',
    func: this.updateEmail,
  }, {
    vmodel: this.form.password,
    id: 'login-password',
    label: 'Password',
    type: 'password',
    func: this.updatePassword,
  }]

  signIn(): void {
    this.$store.dispatch('signIn', this.form);
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/inputs/_input.scss';

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  margin-top: 30px;
}

</style>
