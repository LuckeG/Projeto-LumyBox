import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from '@angular/fire/auth';
import { UserCredential } from 'firebase/auth';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    constructor(private auth: Auth, private http: HttpClient) { }

    login(credentials: { username: string, password: string }) {
        return this.http.post<{ access: string; refresh: string }>('http://localhost:8000/auth/jwt/create/', credentials);
    }

    async loginWithGoogle(): Promise<UserCredential> {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(this.auth, provider);

        const user = result.user;

        try {
            const result: UserCredential = await signInWithPopup(this.auth, provider);
            console.log('Usuário retornado pelo Google:', result.user);

            localStorage.setItem('username', user.displayName || 'Visitante');
            localStorage.setItem('photoURL', user.photoURL || '');
            localStorage.setItem('email', user.email || '');

            return result;
        }
        catch (error) {
            console.error('erro ao fazer login com o Google:', error);
            throw error;
        }
    }

    // auth.service.ts
    loginWithEmail(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }


    logout() {
        return this.auth.signOut();
    }
}