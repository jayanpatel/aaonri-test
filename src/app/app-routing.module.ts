import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component: RegistrationComponent},
  { path: 'signin', component: LoginComponent},
  { path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'}) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule {}