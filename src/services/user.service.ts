import * as firebase from 'firebase';

export default {
  async getUser(): Promise<firebase.User | null> {
    return firebase.auth().currentUser;
  },
};
