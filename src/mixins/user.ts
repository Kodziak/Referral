/* eslint-disable import/prefer-default-export */
import firebase from 'firebase';

export const user = {
  async getUser(): Promise<firebase.User | null> {
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
  },
};
