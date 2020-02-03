/* eslint-disable class-methods-use-this */

class StorageService {
  getUserData() {
    let value: any = localStorage.getItem('userData');
    value = JSON.parse(value);

    if (value && value.uid && value.email) {
      return value;
    }
    return null;
  }
}

export default new StorageService();
