<template>
<div class="card">
        <button class="card-delete" @click="deleteCard(referral.id)">x</button>
        <h3 class="title">{{referral.title}}</h3>
        <div class="card-input">
          <p>Base url:</p>
          <input type="text" :value="referral.baseUrl" readonly="readonly">
          <button class="btn btn-copy"
            v-clipboard:copy="referral.baseUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >Copy to clipboard</button>
        </div>
        <div class="card-input">
          <p>Referral url:</p>
          <input type="text"
            :value="referral.referralUrl"
            readonly="readonly"
          >
          <button class="btn btn-copy"
            v-clipboard:copy="referral.referralUrl"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >Copy to clipboard</button>
        </div>
        <button class="btn">Edit</button>
        <p class="created-at">Created at: <span>{{changeDate(referral.createdAt)}}</span></p>
      </div>
</template>

<script lang="ts">
/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component({
  name: 'ReferralCard',
  props: {
    referral: {
      type: Object,
      required: true,
    },
  },
})
export default class ReferralCard extends Vue {
  user = firebase.auth().currentUser;

  dateOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  deleteCard(docId: string): void {
    if (this.user) {
      firebase
        .firestore()
        .collection('users')
        .doc(this.user.uid)
        .collection('referrals')
        .doc(docId)
        .delete();
    }
  }

  changeDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString('en-US', this.dateOptions);
  }

  onCopy(e: Event): void {
    // alert(`You just copied: ${e.text}`);
  }

  onError(e: Event): void {
    alert('Failed to copy texts');
  }
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid grey;
  box-shadow: 1, 1, 0.2, black;
  margin: 20px;
  padding: 10px;

  input {
    width: 70%;
    height: 20px;
  }
}
</style>
