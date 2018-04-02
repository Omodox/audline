import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { AudioService } from '../audio/audio.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [AudioService]
})
export class SearchComponent implements OnInit {
  audiolist;
  id;
  search;
genre;

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute, private audioService : AudioService){

    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
          this.search = queryParam['q'];
          this.genre = queryParam['g'];
          if (this.search) {
          // console.log(this.search);
          this.audioService.getPlaylistBySearch(this.search).subscribe(res => {
            this.audiolist = res;})
        }
        if (this.genre) {
          // console.log(this.search);
          this.audioService.getPlaylistByGenre(this.genre).subscribe(res => {
            this.audiolist = res;})
        }
          }
      }
  );
  

ngOnInit(){}

}



