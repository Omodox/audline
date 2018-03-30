import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  sid = localStorage.getItem('sid');

  constructor(private router: Router){}

  search_form(search) {
    console.log(search.length > 1)
    this.router.navigate(['/search'], { queryParams: { q : search}} );

  }

  ngOnInit() {
  }

}
