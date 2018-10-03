import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../shared/registration.model';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from '../shared/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  formInvalid: boolean = false;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private modalService: NgbModal, private registrationService: RegistrationService, fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.resetForm();
    this.formInvalid = false;
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
  }

  OnSubmit(form: NgForm) {
    console.log(form.value);
    this.formInvalid = false;
    this.registrationService.authorizeUser(form.value)
      .subscribe((data: any) => {
        if (data.emailId) {
          this.resetForm(form);
          this.router.navigateByUrl('');
          //this.toastr.success('User registration successful');
        } else {
          this.formInvalid = true;
        }
        // else
        // this.toastr.error(data.Errors[0]);
      });
    // this.toastr.success('User registration successful');
  }

}
