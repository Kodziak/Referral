/* eslint-disable class-methods-use-this */

import * as firebase from 'firebase';

class UserService {
  public async getUser(): Promise<firebase.User | null> {
    return firebase.auth().currentUser;
  }
}

export default new UserService();
