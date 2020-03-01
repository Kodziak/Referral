<template>
  <div>
    <h4>Register</h4>
    <form class="register-form">
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
        >
        <div
          v-if="!validation.email"
          class="validation-email"
        >
          <span>E-mail is invalid</span>
        </div>
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
        >
        <div
          class="validation-password"
        >
          <span v-if="!validation.password.length">Password is too short.</span>
          <span v-if="!validation.password.lowercase">Password not contain lowercase.</span>
          <span v-if="!validation.password.uppercase">Password not contain uppercase.</span>
          <span v-if="!validation.password.number">Password not contain number.</span>
          <span v-if="!validation.password.specialCharacter">
            Password not contain special character.
          </span>
        </div>
      </div>

      <div class="ref-input">
        <label
          for="password-confirm"
          class="ref-input__label"
        >Confirm Password</label>

        <input
          id="password-confirm"
          v-model="form.passwordConfirmation"
          class="ref-input__input"
          type="password"
          required
        >
        <div>
          <span v-if="!validation.passwordConfirmation">Passwords are not equal</span>
        </div>
      </div>
    </form>

    <div class="buttons">
      <route-change
        title="Back"
        to="/"
      />
      <ref-button
        class="btn-menu"
        type="submit"
        title="Register"
        @click.native="signUp"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
import { Component, Vue, Watch } from 'vue-property-decorator';

import { AuthData } from '@/types/user';

import RouteChange from '../components/buttons/RouteChange.vue';
import RefButton from '@/components/buttons/RefButton.vue';

@Component({
  components: {
    RouteChange,
    RefButton,
  },
})
export default class Register extends Vue {
  private form: AuthData = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  private validation: any = {
    email: true,
    password: {
      length: true,
      lowercase: true,
      uppercase: true,
      number: true,
      specialCharacter: true,
    },
    passwordConfirmation: true,
  }

  // @Watch('form.email')
  validateEmail(value: string) {
    // eslint-disable-next-line no-useless-escape
    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = EMAIL_REGEX.test(String(value).toLowerCase());

    this.validation.email = result;
    return result;
  }

  // @Watch('form.password')
  validatePassword(value: string) {
    const REGEX_PASSWORD_LENGTH = /(?=.{8,})/;
    const REGEX_PASSWORD_LOWERCASE = /(?=.*[a-z])/;
    const REGEX_PASSWORD_UPPERCASE = /(?=.*[A-Z])/;
    const REGEX_PASSWORD_NUMBER = /(?=.*[0-9])/;
    const REGEX_PASSWORD_SPECIAL_CHARACTER = /(?=.*[!@#$%^&*])/;

    this.validation.password.length = REGEX_PASSWORD_LENGTH.test(value);
    this.validation.password.lowercase = REGEX_PASSWORD_LOWERCASE.test(value);
    this.validation.password.uppercase = REGEX_PASSWORD_UPPERCASE.test(value);
    this.validation.password.number = REGEX_PASSWORD_NUMBER.test(value);
    this.validation.password.specialCharacter = REGEX_PASSWORD_SPECIAL_CHARACTER.test(value);

    if (REGEX_PASSWORD_LENGTH.test(value)
    && REGEX_PASSWORD_LOWERCASE.test(value)
    && REGEX_PASSWORD_UPPERCASE.test(value)
    && REGEX_PASSWORD_NUMBER.test(value)
    && REGEX_PASSWORD_SPECIAL_CHARACTER.test(value)) {
      return true;
    }
    return false;
  }

  // @Watch('form.passwordConfirmation')
  validatePasswordConfirmation(value: string) {
    if (this.form.password === value) {
      this.validation.passwordConfirmation = true;
      return true;
    }
    this.validation.passwordConfirmation = false;
    return false;
  }


  signUp(): void {
    const validationEmail = this.validateEmail(this.form.email);
    const validationPassword = this.validatePassword(this.form.password);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const validationPassConf = this.validatePasswordConfirmation(this.form.passwordConfirmation!);

    if (validationPassConf && validationEmail && validationPassword) {
      this.$store.dispatch('signUp', this.form);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/inputs/_input.scss';
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  margin-top: 30px;
}

.validation-password {
  display: flex;
  flex-direction: column;
}
</style>
