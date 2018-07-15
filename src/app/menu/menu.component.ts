import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeartService } from '../audiolist/heart.service';
import { MenuHttpService } from './menu-http.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers : [MenuHttpService]
})
export class MenuComponent implements OnInit {


  mobile_nav_open = false;
  mobile_nav_search_open = false;


  sid = localStorage.getItem('sid');
  my_status = localStorage.getItem('status');

  money;

  mobile_search(item) {
    setTimeout(() => {
      item.focus();
    }, 200);
  
    console.log(item);
  };

  constructor(private router: Router, private heartService: HeartService, private menuHttpService: MenuHttpService) { }

  search_form(search) {
    console.log(search.length > 1);
    if (search.length > 1) {
      this.router.navigate(['/search'], { queryParams: { q: search } });

      this.mobile_nav_search_open = false;
      this.mobile_nav_open = false;
    }

  }


  ngOnInit() {

  

    this.menuHttpService.getMoneyImg().subscribe(
      res => {
    console.log(res);
    if (res.status)
    this.money = res;
      }
    );

  }



}
