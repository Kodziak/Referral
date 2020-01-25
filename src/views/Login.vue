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
      <div>
        <button id="back" type="submit" @click="back">Back</button>
        <button type="submit" @click="signIn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    back(e) {
      e.preventDefault();
      this.$router.push('/');
    },

    signIn(e) {
      e.preventDefault();

      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
        this.$router.push('dashboard');
      }, (err) => {
        alert('Bad credentials');
      });
    },
  },
};
</script>

<style lang="scss">
input {
  width: 300px;
  height: 40px;
  font-size: 16px;
}
</style>
