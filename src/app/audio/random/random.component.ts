import { Component, OnInit, OnDestroy } from '@angular/core';
import { AudioService } from './.././audio.service';
import { HeartService } from '../../audiolist/heart.service';


@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss'],
  providers: [AudioService]
})
export class RandomComponent implements OnInit {

  audiolist;
  sid = localStorage.getItem('sid');
  filter;
  subToFilter;

  constructor(private audioService: AudioService, private heartService: HeartService) { }

  ngOnInit() {

    this.filter = 'random';

    // console.log(this.filter);

  this.subToFilter =   this.heartService.new_filter.subscribe(res => {
      this.filter = res;
      this.heartService.filter =  res;
      this.getMinePage();
    });


    this.getMinePage();
  }

  ngOnDestroy() {
    this.subToFilter.unsubscribe();
  }

  getMinePage() {

    this.audioService.audGetAudio(this.filter).subscribe(res => {

      this.audiolist = res;

      if (this.sid) {
        this.audioService.getMyPlaylist(this.sid).subscribe(res => {

          res.forEach(element => {
            let s = this.audiolist.findIndex(x => x.id == element.id);
            if (s >= 0) {
              this.audiolist[s].liked = true;
            }
          });
        });

        this.audioService.getMyBlackPlaylist(this.sid).subscribe(res => {

          res.forEach(element => {
            let s = this.audiolist.findIndex(x => x.id == element.id);
            if (s >= 0) {
              this.audiolist.splice(s, 1);
            }
          });
        });
      }

    });

  }

}
