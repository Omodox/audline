import { Component, OnInit } from '@angular/core';
import { AudioService } from './audio.service'


@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss'],
  providers: [AudioService]
})
export class AudioComponent implements OnInit {

  audiolist ;
  sid = localStorage.getItem('sid');

  constructor( private audioService: AudioService,) { }

  ngOnInit() {

  

          this.audioService.audGetAudio().subscribe(res => {
              res.forEach(function(item) {
                  item._id = item.id;
              });
              
            this.audiolist = res;

          if (this.sid) {
                this.audioService.getMyPlaylist(this.sid).subscribe(res => {

                res.forEach(element => {
                  let s =  this.audiolist.findIndex(x => x._id == element._id);
                     if (s >= 0) {
                              this.audiolist[s].liked = true;
                              }
                     });
                   });

                   this.audioService.getMyBlackPlaylist(this.sid).subscribe(res => {
                    res.forEach(element => {
                      let s =  this.audiolist.findIndex(x => x._id == element._id);
                         if (s >= 0) {
                          this.audiolist.splice(s,1);
                                  }
                         });
                       });
                 }
   
        });

}
}
