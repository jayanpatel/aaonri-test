import { NgModule, HostListener }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { SigninComponent } from './signin/signin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { SubmitModalComponent } from './submit-modal/submit-modal.component';
import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';
import { RegistrationService } from './shared/registration.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EqualValidator } from './shared/directives/equal-validator.directive';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EventsDirective } from './shared/directives/events.directive';
import { NumFormatDirective } from './shared/directives/num-format.directive';

import { SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider } from "angular-6-social-login";

// Configs
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("1183718995100203")
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("642095533946-easfp52carlv3r19plpvftm2a55ilcrp.apps.googleusercontent.com")
      }
    ]);

  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    EqualValidator,
    LoginComponent,
    SigninComponent,
    HomepageComponent,
    EventsDirective,
    NumFormatDirective
    // SubmitModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SocialLoginModule,
    NgbModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    RegistrationService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
  @HostListener('window:scroll') doSomething(){
    alert('itWorks');
  }
 }
