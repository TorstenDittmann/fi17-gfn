import { RouterModule, Routes } from '@angular/router';

import { AusbildungsnachweisComponent } from './ausbildungsnachweis/ausbildungsnachweis.component';
import { AusbildungsnachweisVerwaltenComponent } from './ausbildungsnachweis-verwalten/ausbildungsnachweis-verwalten.component';
import { AusbildungsnachweiseComponent } from './ausbildungsnachweise/ausbildungsnachweise.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { PwVergessenComponent } from './pw-vergessen/pw-vergessen.component';
import { RegisterComponent } from './register/register.component';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';
import { StartseiteComponent } from './startseite/startseite.component';
import { PraktikumComponent } from './praktikum/praktikum.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'passwort-vergessen',
    component: PwVergessenComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'startseite',
    component: StartseiteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ausbildungsnachweise',
    component: AusbildungsnachweiseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ausbildungsnachweise/:nummer/:fachrichtung',
    component: AusbildungsnachweisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ausbildungsnachweise/verwalten/:nummer/:fachrichtung',
    component: AusbildungsnachweisVerwaltenComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'praktikum',
    component: PraktikumComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
