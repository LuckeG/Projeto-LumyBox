import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private router: Router, private cliente: HttpClient) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  redirectToCadastro(): void {
    this.router.navigate(['/register']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload = {
        username: this.registerForm.controls ['email'].value,
        password: this.registerForm.controls ['password'].value,
        re_password: this.registerForm.controls ['confirmPassword'].value
      };

      this.cliente.post('http://localhost:8000/auth/users/', payload)
        .subscribe((resp) => console.log(resp));
    }
}}