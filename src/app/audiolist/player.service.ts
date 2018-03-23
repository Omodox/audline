import { Injectable } from '@angular/core';
import { OnInit, Input, Output, EventEmitter,  OnChanges, OnDestroy, HostListener } from '@angular/core';


@Injectable()
export class PlayerService {

  currentTime: number;
    constructor(){}

 audio = <any>document.getElementById('player');
 audio_info = <any>document.getElementById

 playerVolume() {
    if (localStorage.getItem('volume')) {

        if (window.innerWidth < 769) {
          this.audio.volume = 1;
        }
        else {
        this.audio.volume = localStorage.getItem('volume');
        }
      }
      else
      {
        localStorage.setItem('volume', '0.3');
        this.audio.volume = 0.3;
      }
 }

 playerPlay() {
     this.playerVolume();
    if (this.audio.paused === true) {
        this.audio.play();
    } else {
      this.audio.pause();
      }
 } 
// **************
 playerNext(new_track){
    this.addtoPlayer(new_track);
  }

  playerPrev(new_track){
    this.addtoPlayer(new_track);
  }

  addtoPlayer(new_track) {
    // let player = this.playerService;
    if (this.audio.ida !== new_track.id) {
      this.audio.ida = new_track.id;
    //   ****************************************
      this.audio.src = new_track.url;
      this.playerUpdateTrackInfo(new_track);
    }
    this.playerPlay();
    }

  playerUpdateTrackInfo(new_track) {
    this.track_info = document.getElementById('track_info');
    this.track_info.innerHTML = new_track.performer_name  + ' - ' + new_track.name;
  }

  }
