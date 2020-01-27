<template>
  <div class="add-new">
    <h1>This is an adding new referral page</h1>
    <div>
        <label for="name">Name</label>
        <div>
          <input id="name" type="text" v-model="name" required />
        </div>
      </div>
      <button id="add-referral" type="button" @click.prevent="addReferral">Add Referral</button>
      <button id="back" type="button" @click.prevent="back">Back</button>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

@Component
export default class AddReferral extends Vue {
    name: string = '';

    back(e: Event): void {
      this.$router.push('dashboard');
    }

    addReferral(e: Event): void {
      this.$router.push('dashboard');
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
