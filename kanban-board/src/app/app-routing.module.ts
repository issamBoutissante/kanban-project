import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { authGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'board/:id', canActivate: [authGuard], component: BoardComponent },
  { path: 'home', canActivate: [authGuard], component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
