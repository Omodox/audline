import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { AudioService } from '../audio/audio.service'

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
  providers: [
    AudioService
  ]
})
export class MusicComponent implements OnInit {

  id = '';
  audiolist;
  performer;
  sid = localStorage.getItem('sid');

  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  constructor(private route: ActivatedRoute, private audioService: AudioService) {

    this.routeSubscription = route.params.subscribe(params => {
      this.id = params['id'];

      this.audioService.audGetMusicPlaylist(this.id).subscribe(res => {
        this.audiolist = res;
      });

      this.audioService.getPerformerInfo(this.id).subscribe(res2 => {
        this.performer = res2;
      });

    } );
  }

  ngOnInit() {



    this.audioService.audGetBandPlaylist(this.id).subscribe(res => {

      this.audioService.getPerformerInfo(this.id).subscribe(res2 => {
        this.performer = res2;
        if (res2.count !== res.length) {
          this.audioService.updeteBandCountTracks(res2.url, res.length).subscribe(res3 => {
            console.log(res3);
            this.performer.count = res.length;
          });
        }
      });

      res.forEach(function (item) {
        item._id = item.id;
      });

      this.audiolist = res;

      if (this.sid) {
        this.audioService.getMyPlaylist(this.sid).subscribe(res => {

          res.forEach(element => {
            let s = this.audiolist.findIndex(x => x._id == element._id);
            if (s >= 0) {
              this.audiolist[s].liked = true;
            }
          });
        });

        this.audioService.getMyBlackPlaylist(this.sid).subscribe(res => {
          res.forEach(element => {
            let s = this.audiolist.findIndex(x => x._id == element._id);
            if (s >= 0) {
              this.audiolist.splice(s, 1);
            }
          });
        });
      }

    });

  

  }

}

