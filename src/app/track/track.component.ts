import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { AudioService } from '../audio/audio.service'

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
  providers : [
    AudioService
  ]
})
export class TrackComponent implements OnInit {

  id = '';
  audiolist = [];
  sid = localStorage.getItem('sid');

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute, private audioService : AudioService){

        this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    }

  ngOnInit() {

      this.audioService.audGetTrack(this.id).subscribe(res => {
        this.audiolist.push(res);
    });

  }

}


