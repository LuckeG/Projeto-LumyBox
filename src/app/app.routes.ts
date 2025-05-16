import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component'; // novo
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: '', component: DefaultLoginLayoutComponent},
    { path: 'forgot-password', component: ForgetPasswordComponent},
    { path: 'register', component:  RegisterComponent},
    { path: 'home', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}