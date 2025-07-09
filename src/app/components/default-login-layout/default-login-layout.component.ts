import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  templateUrl: './default-login-layout.component.html',
  styleUrls: ['./default-login-layout.component.sass'],
  imports: [ReactiveFormsModule, RouterModule]
})

export class DefaultLoginLayoutComponent {
  credentials = {username: '', password: ''};
  loginForm: FormGroup;
  showPassword = false;

  constructor (private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cliente: HttpClient
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  redirectToCadastro(): void {
    this.router.navigate(['/register']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      this.cliente
        .post<{ access: string; refresh: string }>(
          'http://localhost:8000/auth/jwt/create/',
          {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
          }
        )
        .subscribe((resp) => {
          localStorage.setItem('token', resp.access);
  
          const headers = new HttpHeaders({
            Authorization: `Bearer ${resp.access}`
          });
  
          this.cliente.get<{ username: string }>(
            'http://localhost:8000/auth/users/me/',  // URL correta
            { headers }
          ).subscribe(
            userResp => {
              console.log('Resposta da API /auth/users/me/:', userResp);
              
              localStorage.setItem('username', userResp.username);
              console.log('Nome salvo no localStorage:', userResp.username);
              this.router.navigate(['/home']);
            },
            err => {
              console.error('Erro ao buscar dados do usuário:', err);
            }
          );
        });
    }
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle()
    .then((result: UserCredential) => {
      console.log ('Usuário retornado pelo Google:', result.user)
      const userData = {
        username: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL
      };
      console.log('Login realizado com sucesso!', result.user)

      this.router.navigate(['/home'])
    })
    .catch((error: any) => {
      console.error ('erro', error);
    });
  }
  
}