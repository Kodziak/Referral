export default {
  getData(): any {
    let appData: any = localStorage.getItem('appData');
    appData = JSON.parse(appData);

    if (appData && appData.user.uid && appData.user.email) {
      return appData;
    }
    return null;
  },
};
