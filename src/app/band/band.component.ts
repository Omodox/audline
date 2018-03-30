import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { AudioService } from '../audio/audio.service'

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss'],
  providers : [
    AudioService
  ]
})
export class BandComponent implements OnInit {

  id = '';
  audiolist;

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute, private audioService : AudioService){

        this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    }

  ngOnInit() {
    this.audioService.getPlaylistByBandV2(this.id).subscribe(res => {
      this.audiolist = res;})
  }

}

