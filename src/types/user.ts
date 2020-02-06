export interface AuthData {
    email: string;
    password: string;
    passwordConfirmation?: string;
}

export interface UserData {
    uid: firebase.User | null;
    email: string | null;
}
