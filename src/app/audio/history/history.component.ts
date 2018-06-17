import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { AudioService } from '../audio.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [AudioService]
})
export class HistoryComponent implements OnInit {

  id = '';
  audiolist = [];
  sid = localStorage.getItem('sid');

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute, private audioService: AudioService) {

        this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    }

  ngOnInit() {

    this.id = localStorage.getItem('history');

      this.audioService.audGetTrack(this.id).subscribe(res => {
        this.audiolist.push(res);
    });

  }

}



