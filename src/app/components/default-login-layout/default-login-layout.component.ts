import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
      const { username, password } = this.loginForm.value;
  
      this.cliente
        .post<{ access: string; refresh: string }>(
          'http://localhost:8000/auth/jwt/create/',
          { username, password }
        )
        .subscribe({
          next: (resp) => {
            console.log('Token JWT recebido:', resp.access);
            localStorage.setItem('token', resp.access);
  
            this.cliente
              .get<{ username: string; email:string }>(
                'http://localhost:8000/auth/users/me/',
                {
                  headers: {
                    Authorization: `Bearer ${resp.access}`,
                  },
                }
              )
              .subscribe({
                next: (userResp) => {
                  console.log('Usuário retornado:', userResp);
                  if (userResp.username && userResp.username !== 'underfined') {
                    localStorage.setItem('username', userResp.username);
                  } else {
                    console.warn('Campo "nome" ausente na resposta do usuário!', userResp);
                  }
                  this.router.navigate(['/home']);
                },
                error: (err) => {
                  console.error('Erro ao buscar usuário:', err);
                  alert('Erro ao buscar informações do usuário.');
                },
              });
          },
          error: (err) => {
            console.error('Erro ao autenticar:', err);
            alert('Usuário ou senha incorretos.');
          },
        });
    } else {
      alert('Preencha todos os campos!');
    }
  }
  

  loginWithGoogle(){
    this.authService.loginWithGoogle()
    .then((result: UserCredential) => {
      console.log ('Login realizado com sucesso!', result.user)
    })
    .catch((error: any) => {
      console.error ('erro', error);
    });
  }
  
}