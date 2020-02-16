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

    <ref-label-input
      id="referral-input"
      :value="referral.baseUrl"
      :copy="true"
      label="Base url"
      type="text"
      readonly="readonly"
    />

    <ref-label-input
      id="referral-input"
      :value="referral.referralUrl"
      :copy="true"
      label="Referral url"
      type="text"
      readonly="readonly"
    />

    <p class="created-at">
      Description: {{ referral.description }}
    </p>

    <ref-button
      type="button"
      class="btn-menu"
      title="Edit"
      @click.native="showModal"
    />
    <referral-modal
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


  private inputs = [{

    id: 'referral-input',
    label: 'Base url',
    type: 'text',
  }, {

    id: 'referral-input',
    label: 'Referral url',
    type: 'text',

  }]
}
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid grey;
  box-shadow: 1, 1, 0.2, black;
  margin: 20px;
  padding: 10px;

  .card-delete {
    float: right;
  }
}
</style>
