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
          @blur="$v.form.email.$touch()"
        >
        <div v-if="$v.form.email.$error">
          <span
            v-if="!$v.form.email.required"
            class="form-error"
          >This field is required</span>
          <span
            v-if="!$v.form.email.unique"
            class="form-error"
          >This email is taken</span>
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
          @blur="$v.form.password.$touch()"
        >
        <div v-if="$v.form.password.$error">
          <span
            v-if="!$v.form.password.required"
            class="form-error"
          >This field is required</span>
          <span
            v-if="!$v.form.password.minLength"
            class="form-error"
          >The password must be at least 8 characters long</span>
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
          @blur="$v.form.passwordConfirmation.$touch()"
        >
        <div v-if="$v.form.passwordConfirmation.$error">
          <span
            v-if="!$v.form.passwordConfirmation.required"
            class="form-error"
          >This field is required</span>
          <span
            v-if="!$v.form.passwordConfirmation.sameAsPassword"
            class="form-error"
          >Password confirmation must be the same as password!</span>
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
import { Component, Vue } from 'vue-property-decorator';
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';

import RouteChange from '../components/buttons/RouteChange.vue';
import RefButton from '@/components/buttons/RefButton.vue';

@Component({
  components: {
    RouteChange,
    RefButton,
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
})
export default class Register extends Vue {
  private form:
  {email: null | string; password: null | string; passwordConfirmation: null | string} = {
    email: null,
    password: null,
    passwordConfirmation: null,
  }

  signUp(): void {
    this.$v.form.$touch();
    if (this.$v.form.$invalid) {
      console.log('invalid');
      return;
    }

    this.$store.dispatch('signUp', this.form);
  }
}
</script>

<style lang="scss" scoped>
@import '@/components/inputs/_input.scss';

.form-error {
  margin: 5px 0;
  padding: 3px;
  background: red;
  border-radius: 5px;
}

.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  margin-top: 30px;
}
</style>
