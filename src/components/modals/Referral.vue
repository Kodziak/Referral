<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          id="modalTitle"
          class="modal-header"
        >
          Add new referral
          <button
            type="button"
            class="btn-close"
            aria-label="Close modal"
            @click.prevent="close"
          >
            x
          </button>
        </header>

        <section
          id="modalDescription"
          class="modal-body"
        >
          <div>
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
        </section>

        <footer class="modal-footer">
          <ref-button
            v-if="referralVal"
            type="submit"
            title="Update"
            @click.native="updateReferral(referralVal)"
          />
          <ref-button
            v-else
            type="submit"
            title="Add Referral"
            @click.native="addReferral"
          />
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

import RefLabelInput from '@/components/inputs/RefLabelInput.vue';
import RefButton from '@/components/buttons/RefButton.vue';

@Component({
  name: 'RefModal',
  components: {
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

  @Emit('close')
  close(): void {
    this.clearInputs();
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

    if (this.referralValNew.title !== '' && this.referralValNew.baseUrl !== '' && this.referralValNew.referralUrl !== '' && this.referralValNew.description !== '') {
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
}
</script>

<style lang="scss" scoped>
.modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
</style>
