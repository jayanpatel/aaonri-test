
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../shared/registration.model';
import { RegistrationService } from '../shared/registration.service';
// import { ToastrService } from 'ngx-toastr'
import {NgbModal, ModalDismissReasons,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
//import {SubmitModalComponent} from '../submit-modal/submit-modal.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  closeResult: string;
  currentStep:number;
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  phonePattern = "^[0-9]{10}$";

  constructor(private modalService: NgbModal,private registrationService: RegistrationService, fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.resetForm();
   }

  OnSubmit(form: NgForm) {
    console.log(form.value);
    this.registrationService.authorizeUser(form.value)
      .subscribe((data: any) => {
        if (data.emailId) {
          this.resetForm(form);
          alert('User ' + data.userName + ' login successful!');
          this.router.navigateByUrl('');
          //this.toastr.success('User registration successful');
        } else {
          alert('User/Password did not match!!');
        }
        // else
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
}
