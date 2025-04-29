import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component'; // novo
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: '', component: DefaultLoginLayoutComponent},
    { path: 'forgot-password', component: ForgetPasswordComponent},
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}