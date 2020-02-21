<template>
  <div class="card">
    <button
      class="card__delete-button"
      @click="deleteCard(referral.id)"
    >
      x
    </button>
    <h3 class="card__title">
      {{ referral.title }}
    </h3>

    <ref-label-input
      :value="referral.baseUrl"
      :copy="true"
      :readonly="true"
      label="Base url"
      type="text"
      class="card__input"
    />

    <ref-label-input
      :value="referral.referralUrl"
      :copy="true"
      :readonly="true"
      label="Referral url"
      type="text"
      class="card__input"
    />

    <p class="card__description">
      Description: {{ referral.description }}
    </p>

    <ref-button
      type="button"
      title="Edit"
      @click.native="showModal"
    />
    <referral-modal
      v-show="isModalVisible"
      :referral-val="referral"
      @close="closeModal"
    />

    <!-- <p class="card__created-at">
      <span>{{ changeDate(referral.createdAt) }}</span>
    </p> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import RefLabelInput from '@/components/inputs/RefLabelInput.vue';
import RefButton from '@/components/buttons/RefButton.vue';
import ReferralModal from '@/components/modals/Referral.vue';

@Component({
  name: 'RefCard',
  props: {
    referral: {
      type: Object,
      required: true,
    },
  },
  components: {
    RefLabelInput,
    RefButton,
    ReferralModal,
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
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid grey;
  padding: 20px;

  &__delete-button {
    background: green;
    color: white;
    float: right;
  }

  &__title {
    margin: 20px 0 10px;
  }

  &__input {
    margin: 15px 0;
  }

  &__description {
    text-align: left;
  }

  &__created-at {
    text-align: center;
  }
}
</style>
