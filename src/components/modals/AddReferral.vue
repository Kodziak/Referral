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
            <label for="name">Name</label>
            <div>
              <input
                v-if="referralVal"
                type="text"
                :value="referralVal.title"
                required
                @input="updateTitle"
              >
              <input
                v-else
                v-model="referral.title"
                type="text"
                required
              >
            </div>
          </div>
          <div>
            <label for="referral_url">Referral URL</label>
            <div>
              <input
                v-if="referralVal"
                type="text"
                :value="referralVal.referralUrl"
                required
                @input="updateReferralUrl"
              >
              <input
                v-else
                v-model="referral.referralUrl"
                type="text"
                required
              >
            </div>
          </div>
          <div>
            <label for="base_url">Base URL</label>
            <div>
              <input
                v-if="referralVal"
                type="text"
                :value="referralVal.baseUrl"
                required
                @input="updateBaseUrl"
              >
              <input
                v-else
                v-model="referral.baseUrl"
                type="text"
                required
              >
            </div>
          </div>
          <div>
            <label for="description">Description</label>
            <div>
              <input
                v-if="referralVal"
                type="text"
                :value="referralVal.description"
                required
                @input="updateDescription"
              >
              <input
                v-else
                v-model="referral.description"
                type="text"
                required
              >
            </div>
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
import * as firebase from 'firebase';
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

  updateTitle(event: any) {
    this.referralValNew.title = event.target.value;
  }

  updateReferralUrl(event: any) {
    this.referralValNew.referralUrl = event.target.value;
  }

  updateBaseUrl(event: any) {
    this.referralValNew.baseUrl = event.target.value;
  }

  updateDescription(event: any) {
    this.referralValNew.description = event.target.value;
  }


  @Emit('close')
  close(): void {
    this.referral = {
      title: '',
      referralUrl: '',
      baseUrl: '',
      description: '',
    };
  }

  async addReferral(): Promise<void> {
    const user = await firebase.auth().currentUser;

    if (user && this.referral.title !== '' && this.referral.baseUrl !== '' && this.referral.referralUrl !== '' && this.referral.description !== '') {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals')
        .add({
          title: this.referral.title,
          baseUrl: this.referral.baseUrl,
          referralUrl: this.referral.referralUrl,
          description: this.referral.description,
          createdAt: Date.now(),
        });

      this.close();
    } else {
      console.warn('put data into inputs - add');
    }
  }

  async updateReferral(ref: any): Promise<void> {
    const user = await firebase.auth().currentUser;

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

    if (user && this.referralValNew.title !== '' && this.referralValNew.baseUrl !== '' && this.referralValNew.referralUrl !== '' && this.referralValNew.description !== '') {
      console.log(this.referralValNew);
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('referrals')
        .doc(ref.id)
        .update({
          title: this.referralValNew.title,
          baseUrl: this.referralValNew.baseUrl,
          referralUrl: this.referralValNew.referralUrl,
          description: this.referralValNew.description,
        });

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

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  input {
    width: 70%;
    height: 20px;
  }
</style>
