import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users = [
{
  email : 'khoroshcho@gmail.com',
  password : '12345678'
}
  ]

  email : string;
  constructor(private router: Router){}

  ngOnInit() {
   if (localStorage.getItem('id'))
   {
    localStorage.removeItem('id');
    // window.location.replace("/login");
   }
  }

  login() {
   let ss =  this.users.find(x => { return x.email == this.email});
   if (ss) {
    localStorage.setItem('id',this.email);
    // this.router.navigate(['/']);
    window.location.replace("/");
   }
  }

}
