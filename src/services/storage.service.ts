/* eslint-disable class-methods-use-this */

class StorageService {
  public getUserData(): any {
    let appData: any = localStorage.getItem('appData');
    appData = JSON.parse(appData);
    console.log(appData);

    if (appData && appData.user.uid && appData.user.email) {
      return appData;
    }
    return null;
  }
}

export default new StorageService();
