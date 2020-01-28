<template>
  <div class="add-new">
    <h1>This is an adding new referral page</h1>
    <div>
      <label for="name">Name</label>
      <div>
        <input id="name" type="text" v-model="referral.title" required />
      </div>
    </div>
    <div>
      <label for="referral_url">Referral URL</label>
      <div>
        <input id="referral_url" type="text" v-model="referral.url" required />
      </div>
    </div>
    <div>
      <label for="base_url">Base URL</label>
      <div>
        <input id="base_url" type="text" v-model="referral.baseUrl" required />
      </div>
    </div>
    <button id="back" type="button" @click.prevent="back">Back</button>
    <button id="add_referral" type="submit" @click.prevent="addReferral">Add Referral</button>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class AddReferral extends Vue {
  referral: {title: string; url: string; baseUrl: string} = {
    title: '',
    url: '',
    baseUrl: '',
  }

  back(e: Event): void {
    this.$router.push('dashboard');
  }

  addReferral(e: Event): void {
    const user = firebase.auth().currentUser;
    console.log(user);

    if (user) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals')
        .add({
          title: this.referral.title,
          baseUrl: this.referral.baseUrl,
          referralUrl: this.referral.url,
          createdAt: Date.now(),
        });
      this.$router.push('dashboard');
    }
  }
}
</script>

<style lang="scss">
input {
  width: 300px;
  height: 40px;
  font-size: 16px;
}
</style>
