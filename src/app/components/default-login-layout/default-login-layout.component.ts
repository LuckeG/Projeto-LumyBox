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
      ).subscribe((resp) => {
        this.router.navigate(['/home']);
      });
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