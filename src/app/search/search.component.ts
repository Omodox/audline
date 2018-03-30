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

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute, private audioService : AudioService){

    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
          this.search = queryParam['q'];
          if (this.search) {
          console.log(this.search);
          }
      }
  );
  }

ngOnInit() {
  this.audioService.getPlaylistByBandV2(this.id).subscribe(res => {
    this.audiolist = res;})
}

}



