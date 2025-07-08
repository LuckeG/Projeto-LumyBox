import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component'; // novo
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { FilmeDetailComponent } from './components/filme-detail/filme-detail.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';

export const routes: Routes = [
    { path: 'perfil', component: PerfilComponent },
    { path: 'login', component: DefaultLoginLayoutComponent},
    { path: 'forgot-password', component: ForgetPasswordComponent},
    { path: 'register', component:  RegisterComponent},
    { path: 'home', component: HomeComponent },
    { path: 'filmes/:id', component: FilmeDetailComponent },
    { path: 'series/:id', component: SerieDetailComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}