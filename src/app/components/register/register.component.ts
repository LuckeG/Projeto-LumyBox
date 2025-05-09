import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideRepeatPassword = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  redirectToCadastro(): void {
    this.router.navigate(['/register']);
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') this.hidePassword = !this.hidePassword;
    if (field === 'confirmPassword') this.hideRepeatPassword = !this.hideRepeatPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // lógica de cadastro
    }
  }
}
