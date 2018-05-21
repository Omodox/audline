import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpSetsService } from './http-sets.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss'],
  providers: [HttpSetsService]
})
export class SetsComponent implements OnInit {

  constructor(private httpservices :  HttpSetsService ) { }

sid = localStorage.getItem('sid');
my_sts = localStorage.getItem('status');
playlists ;

  ngOnInit() {

    this.httpservices.getPlaylists(this.sid).subscribe(res => {
      console.log(res);
     this.playlists = res;
    });


    
  }

}
