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
          Change password
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
          <form>
            <ref-label-input
              v-for="(input, index) in inputs"
              :key="index"
              :data="input"
            />
          </form>
        </section>

        <footer class="modal-footer">
          <ref-button
            type="submit"
            :click="changePassword"
          >
            Change
          </ref-button>
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
  name: 'ChangePassword',
  components: {
    RefLabelInput,
    RefButton,
  },
})
export default class ChangePassword extends Vue {
  inputs = [{
    title: 'New password',
    id: 'password',
    vmodel: 'password',
    type: 'password',
  }, {
    title: 'Repeat new password',
    id: 'repeat-password',
    vmodel: 'repeatPassword',
    type: 'password',
  }];

  password: string = '';
  repeatPassword: string = '';

@Emit('close')
  close():void {
    this.password = '';
    this.repeatPassword = '';
  }

changePassword(e: Event): void {
  const user = firebase.auth().currentUser;
  if (user && this.password !== '' && this.password === this.repeatPassword) {
    user.updatePassword(this.password).then(() => {
      console.log('Updated succesfull');
      this.$router.push('dashboard');
    }).catch((err) => {
      console.log(err);
    });
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
</style>
