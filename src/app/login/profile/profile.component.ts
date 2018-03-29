import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router) { }


  sid = localStorage.getItem('sid');

  ngOnInit() {

    if (!this.sid) {
      this.router.navigate(['/login']);  
    }
  
  }



  
}