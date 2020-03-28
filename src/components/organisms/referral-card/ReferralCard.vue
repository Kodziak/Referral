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

    <v-m-label-input-copy
      :value="referral.baseUrl"
      :copy="true"
      :readonly="true"
      label="Base url"
      type="text"
      class="card__input"
    />

    <v-m-label-input-copy
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

    <v-a-button
      type="button"
      @click.native="showModal"
    >
      Edit
    </v-a-button>
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
import { Component, Vue, Watch } from 'vue-property-decorator';

import { EventBus } from '@/utils/eventBus';

import ReferralModal from '@/components/organisms/AddEditReferral.vue';

import VMLabelInputCopy from '@/components/molecules/label-input-copy/LabelInputCopy.vue';
import VAButton from '@/components/atoms/button/Button.vue';

@Component({
  name: 'RefCard',
  props: {
    referral: {
      type: Object,
      required: true,
    },
  },
  components: {
    VMLabelInputCopy,
    VAButton,
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

  @Watch('isModalVisible')
  closeModal() {
    EventBus.$on('closeModal', () => {
      this.isModalVisible = false;
    });
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
