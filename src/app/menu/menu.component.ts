import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HeartService } from '../audiolist/heart.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  mobile_nav_open = false;
  mobile_nav_search_open = false;


  sid = localStorage.getItem('sid');


  mobile_search(item){
    item.focus();
  };

  constructor(private router: Router, private heartService : HeartService){}

  search_form(search) {
    console.log(search.length > 1);
    if (search.length > 1) {
      this.router.navigate(['/search'], { queryParams: { q : search}} );

      this.mobile_nav_search_open = false;
      this.mobile_nav_open = false;
    }

  }

  ngOnInit() {

    // console.log(this.heartService.track_id);

    // this.heartService.track.subscribe(res => {
    //   console.log(res);
    //  });

  }

  // send() {
  //   this.heartService.track_id.emit('0000');
  // }


}
