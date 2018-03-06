import { Component, OnInit, Input, Output, EventEmitter,  OnChanges, OnDestroy, HostListener } from '@angular/core';
import { PlayerService } from '../player/player.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [ PlayerService]
})
export class PlayerComponent implements OnInit {

  constructor( playerService: PlayerService ) { }

  performer_name: string;
  url: string;
  audio;
  progress;
  progress_line;
  track_info;
  @Input() item;
  @Output() onChanged = new EventEmitter<any>();

  ngOnInit() {
// this.audio = new Audio();
this.audio = document.getElementById('player');

if (localStorage.getItem('volume')) {
  this.audio.volume = localStorage.getItem('volume');
}
else 
{
  localStorage.setItem('volume', '0.3');
  this.audio.volume = 0.3;
}

this.audio.onpause = () => {
;
};

this.audio.onplay = () => {
  this.playerUpdateTrackInfo();
  };

this.audio.onended = () => {
  this.playerNext();
  };

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
    if (!this.track_info) this.playerUpdateTrackInfo();
    };

  }
  ngOnChanges() {
    // console.log(this.item);
    let active_track =  this.audio.playlist.findIndex(x => x.id == this.item.trackid);
    
    // console.log(this.audio.idt,' ',active_track );
    if (this.audio.idt != active_track) {
    this.audio.src = this.audio.playlist[active_track].url;
    this.audio.idt = active_track;
    // console.log(this.audio.idt,' ',active_track );
    }
    this.playerPlay();
  }

  ngOnDestroy() {
  };

  playerLoadTrackNext() {
    // console.log(this.audio.idt);
    let next = this.audio.idt + 1;
    // console.log(this.audio.playlist[next]);
    this.audio.src = this.audio.playlist[next].url;
    this.audio.idt = next;
    this.playerPlay();
  }

  playerLoadTrackPrev() {
    let next = this.audio.idt - 1;
    this.audio.src = this.audio.playlist[next].url;
    this.audio.idt = next;
    this.playerPlay();
  }

playerPlay(){
  if (this.audio.paused === true) {
      this.audio.play();
      this.onChanged.emit(this.audio.playlist[this.audio.idt].id);
  } else {
    this.audio.pause();
    }
  }

  playerUpdateTrackInfo() {
    let idt =  this.audio.idt;
    let track = this.audio.playlist[idt];
    this.track_info = document.getElementById('track_info');
    this.track_info.innerHTML = track.performer_name  + ' - ' + track.name;
  }

  playerNext() {
    this.playerLoadTrackNext();

  }
  playerPrev() {
    this.playerLoadTrackPrev();

  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) { 
  if (document.activeElement.tagName == 'INPUT') return;

    if (event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
     this.playerPlay();

    }

    if (event.keyCode === 39 || event.keyCode === 69 ) {
      event.preventDefault();
      event.stopPropagation();
     this.playerNext();
    }

    if (event.keyCode === 37 || event.keyCode === 81) {
      event.preventDefault();
      event.stopPropagation();
     this.playerPrev();
    }

    if (event.keyCode === 40 || event.keyCode === 83) {
      event.preventDefault();
      event.stopPropagation();
      if (this.audio.volume >= 0.05)
     this.audio.volume = this.audio.volume - 0.05;
     localStorage.setItem('volume', this.audio.volume);
    }

    if (event.keyCode === 38 || event.keyCode === 87) {
      event.preventDefault();
      event.stopPropagation();
      if (this.audio.volume <= 1)
     this.audio.volume = this.audio.volume + 0.05;
     localStorage.setItem('volume', this.audio.volume);
    }

    if (event.keyCode === 68) {
      event.preventDefault();
      event.stopPropagation();
      if ( (this.audio.duration - this.audio.currentTime) > 5)
     this.audio.currentTime = this.audio.currentTime + 5;
    }


    if (event.keyCode === 65) {
      event.preventDefault();
      event.stopPropagation();
      if (this.audio.currentTime >=  5) 
     this.audio.currentTime = this.audio.currentTime - 5;
    }

    if (event.keyCode === 82) {
      event.preventDefault();
      event.stopPropagation();
      this.audio.playlist =  this.shuffle(this.audio.playlist);

    }
}

}


