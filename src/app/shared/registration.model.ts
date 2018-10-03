export class User {
    firstName: string;
    lastName: string;
    userName: string;
    emailId: string;
    password: string;
    phoneNo: string;
    address1:string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    newsletter: boolean;
    activeUser:boolean;
    authorized:boolean;
    isSurveyCompleted: boolean;
    regdEmailSent: boolean;
}

export class Login {
    userName: string;
    emailId: string;
    password: string;
}