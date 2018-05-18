import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service'
import { HeartService } from '../audiolist/heart.service';


@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [AudioService]
})
export class AudioComponent implements OnInit {

  audiolist;
  sid = localStorage.getItem('sid');
  filter;

  constructor(private audioService: AudioService, private heartService: HeartService) { }

  ngOnInit() {

    this.filter = this.heartService.filter;

    console.log(this.filter);

    this.heartService.new_filter.subscribe(res => {
      this.filter = res;
      this.heartService.filter =  res;
      this.getMinePage();
    });


    this.getMinePage();
  }

  getMinePage() {

    this.audioService.audGetAudio(this.filter).subscribe(res => {

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
