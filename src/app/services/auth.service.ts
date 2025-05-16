import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable ({
    providedIn: 'root',
})

export class AuthService {
    constructor(private auth: Auth) {}

    loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup (this.auth, provider);
    }

    // auth.service.ts
    loginWithEmail(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }


    logout() {
        return this.auth.signOut();
    }
}