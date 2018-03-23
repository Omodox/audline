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


  constructor( private audioService: AudioService,) { }

  ngOnInit() {

      this.audioService.getPlaylist().subscribe(res => {
        this.audiolist = res;});

}
}
