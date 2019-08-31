import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartseiteComponent } from './startseite/startseite.component';
import { LoginComponent } from './login/login.component';
import { PwVergessenComponent } from './pw-vergessen/pw-vergessen.component';
import { AusbildungsnachweiseComponent } from './ausbildungsnachweise/ausbildungsnachweise.component';

import { AuthGuard } from './shared/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages.guard';
import { AusbildungsnachweisComponent } from './ausbildungsnachweis/ausbildungsnachweis.component';


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
    path: 'ausbildungsnachweise/:nummer',
    component: AusbildungsnachweisComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
