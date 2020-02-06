<template>
  <div class="card">
    <button
      class="card-delete"
      @click="deleteCard(referral.id)"
    >
      x
    </button>
    <h3 class="title">
      {{ referral.title }}
    </h3>


    <div class="card-input">
      <p>Referral url:</p>
      <input
        type="text"
        :value="referral.referralUrl"
        readonly="readonly"
      >
      <button
        v-clipboard:copy="referral.referralUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="btn btn-copy"
      >
        Copy to clipboard
      </button>
    </div>

    <div class="card-input">
      <p>Base url:</p>
      <input
        type="text"
        :value="referral.baseUrl"
        readonly="readonly"
      >
      <button
        v-clipboard:copy="referral.baseUrl"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        class="btn btn-copy"
      >
        Copy to clipboard
      </button>
    </div>

    <ref-button
      type="button"
      class="btn-menu"
      title="Edit"
      @click.native="showModal"
    />
    <add-referral
      v-show="isModalVisible"
      :referral-val="referral"
      @close="closeModal"
    />

    <p class="created-at">
      Created at: <span>{{ changeDate(referral.createdAt) }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';
import RefButton from '@/components/buttons/RefButton.vue';
import AddReferral from '@/components/modals/AddReferral.vue';

@Component({
  name: 'RefCard',
  props: {
    referral: {
      type: Object,
      required: true,
    },
  },
  components: {
    RefButton,
    AddReferral,
  },
})
export default class RefCard extends Vue {
  isModalVisible = false;

  dateOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  deleteCard(docId: string): void {
    const data = {
      user: this.$store.getters.userData,
      docId,
    };
    this.$store.dispatch('deleteReferral', data);
  }

  showModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  changeDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString('en-US', this.dateOptions);
  }

  // eslint-disable-next-line class-methods-use-this
  onCopy(e: any): void {
    console.log(`You just copied: ${e.text}`);
  }

  // eslint-disable-next-line class-methods-use-this
  onError(e: Event): void {
    console.log('Failed to copy');
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
