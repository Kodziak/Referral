<template>
  <base-modal :props="modalAttributes">
    <form slot="body">
      <v-m-label-input-copy
        v-for="(input, index) in inputs"
        :key="index"
        v-model="input.vmodel"
        :label-id="input.id"
        :label="input.label"
        :type="input.type"
        @value-changed="input.func"
      />
    </form>

    <v-a-button
      slot="footer"
      type="submit"
      @click="changePassword"
    >
      Change
    </v-a-button>
  </base-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as firebase from 'firebase';

import { EventBus } from '@/utils/eventBus';

import BaseModal from '@/components/molecules/modal/Modal.vue';

import VMLabelInputCopy from '@/components/molecules/label-input-copy/LabelInputCopy.vue';
import VAButton from '@/components/atoms/button/Button.vue';


@Component({
  name: 'ChangePassword',
  components: {
    VAButton,
    VMLabelInputCopy,
    BaseModal,
  },
})
export default class ChangePassword extends Vue {
  private password: string = '';
  private repeatPassword: string = '';

  updatePassword(value: string) {
    this.password = value;
  }

  updateRepeatPassword(value: string) {
    this.password = value;
  }

  private inputs = [{
    vmodel: this.password,
    id: 'change-password',
    label: 'New Password',
    type: 'password',
    func: this.updatePassword,
  }, {
    vmodel: this.repeatPassword,
    id: 'change-repeat-password',
    label: 'Repeat Password',
    type: 'password',
    func: this.updateRepeatPassword,
  }]

  close(): void {
    this.password = '';
    this.repeatPassword = '';
    EventBus.$emit('closeModal', true);
  }

  changePassword(): void {
    const user = firebase.auth().currentUser;
    if (user && this.password !== '' && this.password === this.repeatPassword) {
      this.$store.dispatch('changePassword', this.password);
      this.close();
    }
  }

  private modalAttributes = {
    title: 'Change Password',
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
