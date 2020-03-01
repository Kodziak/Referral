import firebase from 'firebase';

export default {
  async getUser(): Promise<firebase.User | null> {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  },
};
