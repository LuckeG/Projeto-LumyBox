import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.sass'
})
export class ForgetPasswordComponent {
  formSenha!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.formSenha = this.fb.group({
      username: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]

    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  alterarSenha() {
    const { username, novaSenha, confirmarSenha } = this.formSenha.value;

    const body = {
      usuario: username,
      novaSenha: novaSenha,
      confirmarSenha: confirmarSenha
    };

    this.http.post('http://localhost:8000/api/alterar-senha/', {
      usuario: this.formSenha.value.username,
      novaSenha: this.formSenha.value.novaSenha,
      confirmarSenha: this.formSenha.value.confirmarSenha
    }, {
      headers: { 'Content-type': 'application/json' }
    }
    
  ).subscribe({
        next: (res) => {
        alert('Senha redefinida com sucesso!');
        this.formSenha.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao redefinir senha:', err);
        alert(err.error?.error || 'Erro ao redefinir senha. Verifique o usuário.');
      }
    });
  }
}
