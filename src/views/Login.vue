<template>
  <div>
    <div>
      <h4>Login</h4>
      <form class="login-form">
        <ref-label-input
          v-for="(input, index) in inputs"
          :key="index"
          v-model="input.vmodel"
          :label-id="input.id"
          :label="input.label"
          :type="input.type"
          @value-changed="input.func"
        />
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
import * as firebase from 'firebase';

import RouteChange from '../components/buttons/RouteChange.vue';
import RefLabelInput from '@/components/inputs/RefLabelInput.vue';
import RefButton from '@/components/buttons/RefButton.vue';

import userService from '@/services/user.service';

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
  private user: firebase.User | null = null;

  private routes = [{ target: '/', title: 'Back' }, { target: '/forgot-password', title: 'Forgot password' }]

  async created() {
    this.user = await userService.getUser();
  }

  updateEmail(value: string) {
    this.email = value;
  }

  updatePassword(value: string) {
    this.password = value;
  }

  private inputs = [{
    vmodel: this.email,
    id: 'login-email',
    label: 'E-mail',
    type: 'email',
    func: this.updateEmail,
  }, {
    vmodel: this.password,
    id: 'login-password',
    label: 'Password',
    type: 'password',
    func: this.updatePassword,
  }]

  signIn(): void {
    this.$store.dispatch('login', {
      email: this.email,
      password: this.password,
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
