<template>
  <div data-id="settings">
    <h1>Settings</h1>
    <h2>{{ user.email }}</h2>

    <v-a-button
      v-for="(button, index) in authButtons"
      :key="index"
      :type="button.type"
      class="nav-button"
      @click.native="button.click"
    >
      {{ button.title }}
    </v-a-button>

    <v-o-change-password
      v-show="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import * as NProgress from 'nprogress';

import { EventBus } from '@/utils/eventBus';

import VAButton from '@/components/atoms/button/Button.vue';
import VOChangePassword from '@/components/organisms/change-password-modal/ChangePassword.vue';

@Component({
  name: 'SettingsTemplate',
  components: {
    VAButton,
    VOChangePassword,
  },
})
export default class SettingsTemplate extends Vue {
  user: firebase.User | null = this.$store.getters.userData;

  // eslint-disable-next-line class-methods-use-this
  created(): void {
    NProgress.done();
  }

  isModalVisible = false;

  showModal() {
    this.isModalVisible = true;
  }

  @Watch('isModalVisible')
  closeModal() {
    EventBus.$on('closeModal', () => {
      this.isModalVisible = false;
    });
  }

  authButtons = [{
    type: 'button',
    title: 'Change password',
    click: this.showModal,
  }]
}
</script>
