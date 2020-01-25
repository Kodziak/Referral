<template>
  <div>
    <h4>Register</h4>
    <form>
      <label for="email">E-Mail</label>
      <div>
        <input id="email" type="email" v-model="email" required />
      </div>

      <label for="password">Password</label>
      <div>
        <input id="password" type="password" v-model="password" required />
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
        <input id="password-confirm" type="password" v-model="password_confirmation" required />
      </div>

      <div>
        <button id="back" type="submit" @click="back">Back</button>
        <button type="submit" @click="register">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  props: ['nextUrl'],
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
    };
  },
  methods: {
    back(e) {
      e.preventDefault();
      this.$router.push('/');
    },

    register(e) {
      e.preventDefault();

      if (this.password === this.password_confirmation && this.email !== '' && this.password !== '') {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          this.$router.push('dashboard');
        }, (err) => {
          alert('Bad credentials');
        });
      } else {
        alert('Put credentials');
      }
    },
  },
};
</script>
