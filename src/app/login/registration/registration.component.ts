import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [LoginService]
})
export class RegistrationComponent implements OnInit {

  constructor(private loginService : LoginService, private router: Router,) { }

  ngOnInit() {
  }

  email;
  password;
  password2;


  signUp() {
    
    this.loginService.signpUp({
      email : this.email ,
      password : this.password,
      password2 : this.password2
    }).subscribe(res => {
    if (res.st == 'ok')   this.router.navigate(['/']);   });;
    }

}
