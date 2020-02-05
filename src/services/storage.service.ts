/* eslint-disable class-methods-use-this */

class StorageService {
  getUserData() {
    let userData: any = localStorage.getItem('userData');
    userData = JSON.parse(userData);

    if (userData.user.uid && userData.user.email) {
      return userData;
    }
    return null;
  }
}

export default new StorageService();
