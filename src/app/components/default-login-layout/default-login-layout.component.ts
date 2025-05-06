import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  templateUrl: './default-login-layout.component.html',
  styleUrls: ['./default-login-layout.component.sass'],
  imports: [ReactiveFormsModule]
})

export class DefaultLoginLayoutComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor (private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Adicione a lógica de login aqui
      console.log('Login', username, password);
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
