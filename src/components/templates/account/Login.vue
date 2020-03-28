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
      <base-button
        v-for="(button, key) in buttons"
        :key="key"
        :to="button.to"

        @click.native="button.click ? button.click() : null"
      >
        {{ button.title }}
      </base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import BaseButton from '@/components/buttons/BaseButton.vue';

@Component({
  components: {
    BaseButton,
  },
})
export default class Login extends Vue {
  private form: {email: null | string; password: null | string} = {
    email: null,
    password: null,
  }

  private user: firebase.User | null = this.$store.getters.userData;

  private buttons = [
    { to: '/', title: 'Back' },
    { to: '/forgot-password', title: 'Forgot password' },
    { click: this.signIn, title: 'Login' },
  ]

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

  updateEmail(value: string) {
    this.form.email = value;
  }

  updatePassword(value: string) {
    this.form.password = value;
  }

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
