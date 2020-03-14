<template>
  <base-modal :props="modalAttributes">
    <div slot="body">
      <ref-label-input
        type="text"
        label-id="ref-input-title"
        label="Title"
        :value="(referralVal) ? referralVal.title : referralValNew.title"
        @value-changed="updateTitle"
      />
      <ref-label-input
        type="text"
        label-id="ref-input-ref-url"
        label="Referral Url"
        :value="(referralVal) ? referralVal.referralUrl : referralValNew.referralUrl"
        @value-changed="updateReferralUrl"
      />
      <ref-label-input
        type="text"
        label-id="ref-input-base-url"
        label="Base Url"
        :value="(referralVal) ? referralVal.baseUrl : referralValNew.baseUrl"
        @value-changed="updateBaseUrl"
      />
      <ref-label-input
        type="text"
        label-id="ref-input-description"
        label="Description"
        :value="(referralVal) ? referralVal.description : referralValNew.description"
        @value-changed="updateDescription"
      />
    </div>

    <ref-button
      v-if="referralVal"
      slot="footer"
      type="submit"
      title="Update"
      @click.native="updateReferral(referralVal)"
    />
    <ref-button
      v-else
      slot="footer"
      type="submit"
      title="Add Referral"
      @click.native="addReferral"
    />
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

import BaseModal from '@/components/modals/BaseModal.vue';
import RefLabelInput from '@/components/inputs/RefLabelInput.vue';
import RefButton from '@/components/buttons/RefButton.vue';

import { EventBus } from '../../utils/eventBus';

@Component({
  name: 'RefModal',
  components: {
    BaseModal,
    RefLabelInput,
    RefButton,
  },
  props: {
    referralVal: {
      type: Object,
      required: false,
    },
  },
})
export default class RefModal extends Vue {
  private referral: {title: string; referralUrl: string; baseUrl: string; description: string} = {
    title: '',
    referralUrl: '',
    baseUrl: '',
    description: '',
  };

  private referralValNew:
  {title: string; referralUrl: string; baseUrl: string; description: string} = {
    title: '',
    referralUrl: '',
    baseUrl: '',
    description: '',
  };

  updateTitle(value: string): void {
    this.referral.title = value;
    this.referralValNew.title = value;
  }

  updateReferralUrl(value: string): void {
    this.referral.referralUrl = value;
    this.referralValNew.referralUrl = value;
  }

  updateBaseUrl(value: string): void {
    this.referral.baseUrl = value;
    this.referralValNew.baseUrl = value;
  }

  updateDescription(value: string): void {
    this.referral.description = value;
    this.referralValNew.description = value;
  }

  clearInputs(): void {
    this.referral = {
      title: '',
      referralUrl: '',
      baseUrl: '',
      description: '',
    };

    this.referralValNew = {
      title: '',
      referralUrl: '',
      baseUrl: '',
      description: '',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  close(): void {
    EventBus.$emit('closeModal', true);
  }

  async addReferral(): Promise<void> {
    console.log(this.referral);
    if (this.referral.title !== '' && this.referral.baseUrl !== '' && this.referral.referralUrl !== '' && this.referral.description !== '') {
      const data = {
        user: this.$store.getters.userData,
        referral: this.referral,
      };

      this.$store.dispatch('addReferral', data);
      this.clearInputs();
      this.close();
    } else {
      console.warn('put data into inputs - add');
    }
  }

  async updateReferral(ref: any): Promise<void> {
    if (this.referralValNew.title === '') {
      this.referralValNew.title = ref.title;
    }
    if (this.referralValNew.baseUrl === '') {
      this.referralValNew.baseUrl = ref.baseUrl;
    }
    if (this.referralValNew.referralUrl === '') {
      this.referralValNew.referralUrl = ref.referralUrl;
    }
    if (this.referralValNew.description === '') {
      this.referralValNew.description = ref.description;
    }

    if (this.referralValNew.title !== ''
      && this.referralValNew.baseUrl !== ''
      && this.referralValNew.referralUrl !== ''
      && this.referralValNew.description !== '') {
      const data = {
        user: this.$store.getters.userData,
        ref,
        referral: this.referralValNew,
      };

      this.$store.dispatch('editReferral', data);
      this.clearInputs();
      this.close();
    } else {
      console.warn('put data into inputs - edit');
    }
  }

  private modalAttributes = {
    title: 'Referral',
    close: this.close,
  }
}
</script>
