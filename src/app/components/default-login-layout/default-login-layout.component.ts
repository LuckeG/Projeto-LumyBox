import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

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
    private router: Router
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

    this.authService.loginWithEmail(username, password)
      .then((result: UserCredential) => {
        console.log('Login realizado com sucesso!', result.user);
        this.router.navigate(['/home']); // Redireciona para a tela Home
      })
      .catch((error: any) => {
        console.error('Erro ao fazer login:', error);
        // Aqui você pode exibir mensagens de erro, etc.
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