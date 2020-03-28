<template>
  <base-modal :props="modalAttributes">
    <div slot="body">
      <v-m-label-input-copy
        type="text"
        label-id="ref-input-title"
        label="Title"
        :value="(referralVal) ? referralVal.title : referralValNew.title"
        @value-changed="updateTitle"
      />
      <v-m-label-input-copy
        type="text"
        label-id="ref-input-ref-url"
        label="Referral Url"
        :value="(referralVal) ? referralVal.referralUrl : referralValNew.referralUrl"
        @value-changed="updateReferralUrl"
      />
      <v-m-label-input-copy
        type="text"
        label-id="ref-input-base-url"
        label="Base Url"
        :value="(referralVal) ? referralVal.baseUrl : referralValNew.baseUrl"
        @value-changed="updateBaseUrl"
      />
      <v-m-label-input-copy
        type="text"
        label-id="ref-input-description"
        label="Description"
        :value="(referralVal) ? referralVal.description : referralValNew.description"
        @value-changed="updateDescription"
      />
    </div>

    <v-a-button
      slot="footer"
      type="submit"
      @click.native="referralVal ? updateReferral(referralVal) : addReferral"
    >
      {{ referralVal ? 'Update' : 'Add Referral' }}
    </v-a-button>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { EventBus } from '@/utils/eventBus';
import { Referral } from '@/types/';

import BaseModal from '@/components/molecules/modal/Modal.vue';

import VMLabelInputCopy from '@/components/molecules/label-input-copy/LabelInputCopy.vue';
import VAButton from '@/components/atoms/button/Button.vue';

@Component({
  name: 'RefModal',
  components: {
    BaseModal,
    VMLabelInputCopy,
    VAButton,
  },
  props: {
    referralVal: {
      type: Object,
      required: false,
    },
  },
})
export default class RefModal extends Vue {
  private referral: Referral = {
    title: '',
    referralUrl: '',
    baseUrl: '',
    description: '',
  };

  private referralValNew: Referral= {
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
