
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { User } from '../shared/registration.model';
import { RegistrationService } from '../shared/registration.service';
// import { ToastrService } from 'ngx-toastr'
import {NgbModal, ModalDismissReasons,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router,NavigationEnd } from '@angular/router';
//import {NumFormatDirective} from '../shared/directives/num-format.directive'
//import {SubmitModalComponent} from '../submit-modal/submit-modal.component';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  firstStep: boolean = true;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  fourthStep: boolean = false;
  userExists: boolean = false;
  closeResult: string;
  currentStep:number;
  user: User;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phonePattern = /^((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/gm;
  cb: any;
  emailErrorMsg: any;
  checkedServices: number = 0;
  public interests = [];
  form: FormGroup;
  slFirstName: string;
  slLastName: string;
  slEmail: string;

  constructor(private modalService: NgbModal,private formBuilder: FormBuilder,private registrationService: RegistrationService, fb: FormBuilder, private router: Router, private socialAuthService: AuthService) {
    const controls = this.interests.map(c => new FormControl(false));
    this.form = this.formBuilder.group({
      interests: new FormArray(controls)
    });
  }

  ngOnInit() {
    this.resetForm();
    this.getUserInterests();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
   }

  stepSubmit(step, form: NgForm){
    if(step==2){
      this.getUserExists(form);
    }

    else if(step==3){
        this.firstStep = false;
        this.secondStep = false;
        this.thirdStep  = true;
        this.fourthStep = false;
        this.currentStep=step;
    }

    else if(step==3){
      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep  = false;
      this.fourthStep = true;
      this.currentStep=step;
    }
  }

  stepPrevious(step){
    if(step==1){
      this.firstStep = true;
      this.secondStep = false;
      this.thirdStep  = false;
      this.fourthStep = false;
      this.currentStep=step;
      console.log(this.currentStep);
    }

    if(step==2){
      this.firstStep = false;
      this.secondStep = true;
      this.thirdStep  = false;
      this.fourthStep = false;
      this.currentStep=step;
      console.log(this.currentStep);
    }

    if(step==4){
      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep  = true;
      this.fourthStep = false;
      this.currentStep=step;
    }
  }

  getUserInterests(){
    this.registrationService.getUserInterests()
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
          this.interests = data;
        }
        else {
          console.log('Empty');
        }
      });
  }

  getUserExists(form: NgForm){
    this.registrationService.userExists(form.value)
      .subscribe((data: any) => {
        if (data.status == "true") {
          console.log(data);
          this.userExists = true;
          this.firstStep = true;
          this.secondStep = false;
          this.currentStep = 1;
          this.emailErrorMsg = true;
        }
        else {
          this.userExists = false;
          this.firstStep = false;
          this.secondStep = true;
          this.currentStep = 2;
          this.emailErrorMsg = false;
        }
        this.thirdStep = false;
        this.fourthStep = false;
      });
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
    this.registrationService.registerUser(form.value)
      .subscribe((data: any) => {
        if (data.userId) {
          this.resetForm(form);
          this.router.navigateByUrl('');
          //this.toastr.success('User registration successful');
        }
        else {
          //this.emailErrorMsg = true;
        }
          // this.toastr.error(data.Errors[0]);
      });
    // this.toastr.success('User registration successful');
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      firstName: '',
      lastName: '',
      userName: '',
      emailId: '',
      password: '',
      phoneNo: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      newsletter: false,
      activeUser: false,
      authorized: false,
      isSurveyCompleted: false,
      regdEmailSent: false,
    }

    this.cb = []
  }

  cbChange(value){
    if(!!(this.cb.indexOf(value)+1))
    {
      this.cb.splice(this.cb.indexOf(value),1);
      this.checkedServices -= 1;
    }
    else
    {
      this.cb.push(value);
      this.checkedServices += 1;
    }
    console.log(this.checkedServices);
    console.log(this.cb);
  }
  //open(content: any, options: NgbModalOptions) => NgbModalRef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered:true,size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    console.log("socialPlatformProvider: " + socialPlatformProvider);

    if(socialPlatform == "facebook")
    {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      console.log("socialPlatformProvider: " + FacebookLoginProvider.PROVIDER_ID);
    }
    else if(socialPlatform == "google")
    {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        this.slEmail = userData.email;
        let uName = userData.name.split(" ");
        this.slFirstName = uName[0];
        this.slLastName = uName[1];
      }
    );
  }

}
