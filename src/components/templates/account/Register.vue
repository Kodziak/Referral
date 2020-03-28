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
      <v-a-button
        v-for="(button, key) in buttons"
        :key="key"
        :to="button.to"

        @click.native="button.click ? button.click() : null"
      >
        {{ button.title }}
      </v-a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { AuthData } from '@/types/user';
import Regex from '@/constants/Regex';

import VAButton from '@/components/atoms/button/Button.vue';

@Component({
  name: 'RegisterTemplate',
  components: {
    VAButton,
  },
})
export default class RegisterTemplate extends Vue {
  private showValidations = false;
  private form: AuthData = {
    email: '',
    password: '',
    passwordConfirmation: '',
  }

  private validation = {
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

  private buttons = [
    { to: '/', title: 'Back' },
    { click: this.signUp, title: 'Register' },
  ]

  @Watch('form.email')
  validateEmail(value: string) {
    let result;

    if (value.length > 5 || this.showValidations) {
      result = Regex.REGEX_EMAIL.test(String(value).toLowerCase());
      this.validation.email = result;
      return result;
    }

    return false;
  }

  @Watch('form.password')
  validatePassword(value: string): boolean {
    const passwordLength = Regex.REGEX_PASSWORD_LENGTH.test(value);
    const passwordLowerCase = Regex.REGEX_PASSWORD_LOWERCASE.test(value);
    const passwordUpperCase = Regex.REGEX_PASSWORD_UPPERCASE.test(value);
    const passwordNumber = Regex.REGEX_PASSWORD_NUMBER.test(value);
    const passwordSpecial = Regex.REGEX_PASSWORD_SPECIAL_CHARACTER.test(value);

    if (value.length > 5 || this.showValidations) {
      this.validation.password.length = passwordLength;
      this.validation.password.lowercase = passwordLowerCase;
      this.validation.password.uppercase = passwordUpperCase;
      this.validation.password.number = passwordNumber;
      this.validation.password.specialCharacter = passwordSpecial;
    }

    if (passwordLength && passwordLowerCase && passwordUpperCase && passwordNumber && passwordSpecial) {
      return true;
    }

    return false;
  }

  @Watch('form.passwordConfirmation')
  validatePasswordConfirmation(value: string): boolean {
    if (this.form.password === value || this.showValidations) {
      this.validation.passwordConfirmation = true;
      return true;
    }
    this.validation.passwordConfirmation = false;
    return false;
  }

  isEverythingValidated(): boolean {
    const validationEmail = this.validateEmail(this.form.email);
    const validationPassword = this.validatePassword(this.form.password);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const validationPassConf = this.validatePasswordConfirmation(this.form.passwordConfirmation!);

    return (validationEmail && validationPassword && validationPassConf);
  }

  signUp(): void {
    if (this.isEverythingValidated()) {
      this.$store.dispatch('signUp', this.form);
    } else {
      this.showValidations = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/atoms/input/_input.scss';

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
