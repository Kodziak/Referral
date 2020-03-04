import { shallowMount } from '@vue/test-utils';
import RefButton from '@/components/buttons/RefButton.vue';

describe('RefButton.vue', (): void => {
  it('renders props.title when passed', (): void => {
    const title = 'Change Password';
    const wrapper = shallowMount(RefButton, {
      propsData: { title },
    });
    expect(wrapper.text()).toMatch(title);
  });
});
