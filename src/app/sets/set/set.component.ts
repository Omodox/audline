import { Component, OnInit } from '@angular/core';
import { HttpSetsService } from './../http-sets.service';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
  providers : [HttpSetsService]
})
export class SetComponent implements OnInit {

  page;
  private subscription: Subscription;

  constructor(private httpSetsService : HttpSetsService, private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params=>this.page=params['id']);
   }

 
  sid = localStorage.getItem('sid');
  playlist;

  ngOnInit() {

    this.httpSetsService.getPlaylist(this.sid,this.page).subscribe(res =>{
      console.log(res);

     this.playlist = res;

    });
  }

}


