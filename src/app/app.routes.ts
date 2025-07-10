import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './views/perfil/perfil.component';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component'; // novo
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { FilmeDetailComponent } from './components/filme-detail/filme-detail.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';
import { SerieDetailRandomComponent } from './components/serie-detail-random/serie-detail-random/serie-detail-random.component';
import { FilmeDetailRandomComponent } from './components/filme-detail-random/filme-detail-random/filme-detail-random.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: 'perfil', component: PerfilComponent },
    { path: 'login', component: DefaultLoginLayoutComponent},
    { path: 'forgot-password', component: ForgetPasswordComponent},
    { path: 'register', component:  RegisterComponent},
    { path: 'home', component: HomeComponent },
    { path: 'filmes/:id', component: FilmeDetailComponent },
    { path: 'series/:id', component: SerieDetailComponent },
    { path: 'filmes-random/:id', component: FilmeDetailRandomComponent },
    { path: 'series-random/:id', component: SerieDetailRandomComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes), ReactiveFormsModule, FormsModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}