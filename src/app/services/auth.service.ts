import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable ({
    providedIn: 'root',
})

export class AuthService {
    constructor(private auth: Auth, private http: HttpClient) {}

    login(credentials: {username: string, password: string}) {
        return this.http.post<{ access: string; refresh: string }>('http://localhost:8000/auth/jwt/create/', credentials);
    }

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