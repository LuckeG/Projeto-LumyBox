import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Injectable ({
    providedIn: 'root',
})

export class AuthService {
    constructor(private auth: Auth) {}

    loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup (this.auth, provider);
    }

    logout() {
        return this.auth.signOut();
    }
}