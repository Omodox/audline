import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  users = [
{
  email : 'khoroshcho@gmail.com',
  password : '12345678'
},
{
  email : 'admin@audline.net',
  password : 'nimda321'
}
  ]

  email : string;
  password: string;
  acc;
  constructor(private router: Router, private loginService : LoginService){}

  ngOnInit() {
   if (localStorage.getItem('id'))
   {
    localStorage.removeItem('id');
    // window.location.replace("/login");
   }
  }

  login() {
     this.loginService.login({'email': this.email, 'password' : this.password}).subscribe(res => {
 if (res) this.sing(res);
        this.acc = res;});
  //  let ss =  this.users.find(x => { return x.email == this.email && x.password == this.password});   
  }

  sing(res) {
    console.log(res);
       localStorage.setItem('id',res[0].email);
       // this.router.navigate(['/']);  
       window.location.replace("/");
   
     }

}
