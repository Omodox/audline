import { Component, OnInit, HostListener } from '@angular/core';
import { HeartService } from '../../audiolist/heart.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor(private  heartService : HeartService) {
   }

   audio = new Audio;
   track_info;
   active_track = 0 ;

   progress: number;
   progress_line: HTMLElement;
  

  ngOnInit() {

    this.audio.volume = Number(localStorage.getItem('volume'));


    this.heartService.track.subscribe(res => {
      this.addtoPlayer(res);
      this.heartService.track_active = res;
     });



     this.progress_line = document.getElementById('trackname');
    this.progress_line.onclick = (e) => {
    //  console.log(e);
     var offset = this.progress_line.getBoundingClientRect();
     var position = 100 / offset.width * (e.clientX - offset.left);
    //  console.log(position);
     var playerTime =  this.audio.duration /100 * position;
    //  console.log(playerTime);
    this.audio.currentTime = playerTime;
    };
  
    this.audio.ontimeupdate = () => {
      this.progress =  100 / this.audio.duration * this.audio.currentTime;
      };

    this.audio.onended = () => {
      // this.playerNext();
      };


  }


  playerVolumeSlider(res) {
    this.audio.volume = res
   localStorage.setItem('volume', String(res));

  }


  
 playerVolume() {
  if (localStorage.getItem('volume')) {
      this.audio.volume = Number(localStorage.getItem('volume'));
    }
    else
    {
      localStorage.setItem('volume', '0.3');
      this.audio.volume = 0.3;
    }

    if (window.innerWidth < 769) {
      this.audio.volume = 1;
    }



}

playerPlay() {
   this.playerVolume();
  if (this.audio.paused === true) {
      this.audio.play();
  } else {
    this.audio.pause();
    this.playerStopTrack();
    }
} 



addtoPlayer(new_track) {



  if (this.active_track !=  new_track.id) {


    this.audio.src = new_track.url;
    this.playerUpdateTrackInfo(new_track);
    this.active_track = new_track.id;
  }
 
  this.playerPlay();
  }

playerUpdateTrackInfo(new_track) {
  this.track_info = document.getElementById('track_info');
  this.track_info.innerHTML = new_track.performer_name  + ' - ' + new_track.name;
}

playerNextTrack() {
  this.heartService.from_player.emit('next');
}
playerPrevTrack() {
  this.heartService.from_player.emit('prev');
}
playerStopTrack() {
  this.heartService.from_player.emit('stop');
}




@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) { 
  if (document.activeElement.tagName == 'INPUT') { return; }

  const player = this; 



    if (event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      player.playerPlay();

    }


    if (event.keyCode === 40 || event.keyCode === 83) {
      event.preventDefault();
      event.stopPropagation();
      if (Math.floor(player.audio.volume*100) >= 5)
      player.audio.volume = player.audio.volume - 0.05;
      if (player.audio.volume <= 0.06) player.audio.volume = 0;
     localStorage.setItem('volume', String(player.audio.volume));
    }

    if (event.keyCode === 38 || event.keyCode === 87) {
      event.preventDefault();
      event.stopPropagation();
      if (Math.floor(player.audio.volume*100) <= 100)
      player.audio.volume = player.audio.volume + 0.05;
      if (player.audio.volume >= 0.94) player.audio.volume = 1;
     localStorage.setItem('volume', String(player.audio.volume));
    }

    if (event.keyCode === 68) {
      event.preventDefault();
      event.stopPropagation();
      if ( (player.audio.duration - player.audio.currentTime) > 5)
      player.audio.currentTime = player.audio.currentTime + 5;
    }


    if (event.keyCode === 65) {
      event.preventDefault();
      event.stopPropagation();
      if (player.audio.currentTime >=  5) 
      player.audio.currentTime = player.audio.currentTime - 5;
    }
}

}