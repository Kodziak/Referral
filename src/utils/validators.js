import { helpers as vuelidateHelpers } from 'vuelidate/lib/validators';
import firebase from 'firebase';

export const uniqueEmail = (value) => {
  if (!vuelidateHelpers.req(value)) {
    return true;
  }

  return new Promise((resolve, reject) => {
    firebase.database().ref('users').orderByChild('email').equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()));
  });
};

export const uniqueUsername = (value) => {

};
