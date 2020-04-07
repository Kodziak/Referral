import * as firebase from 'firebase';

interface AuthData {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

interface UserData {
  uid: firebase.User | null;
  email: string | null;
}

type User = firebase.User | null;

export {
  AuthData,
  UserData,
  User,
};
