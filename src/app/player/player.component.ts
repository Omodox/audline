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


  @Input() item;
  @Output() onChanged = new EventEmitter<boolean>();

  ngOnInit() {

this.audio = new Audio();
this.audio.volume = 0.3;

this.audio.onpause = () => {
console.log( document.getElementById('trackname'));
};

this.audio.onended = () => {
  this.playerNext();
  };
 

  this.audio.ontimeupdate = () => {
    this.progress =  100 / this.audio.duration * this.audio.currentTime;
    };

  }
  ngOnChanges() {
    if (this.item.track.url !== this.audio.src) {
     this.audio.src = this.item.track.url;
     this.audio.id = this.item.id;
    //  console.log(this.item);
  }
  this.playerPlay();
  }

  ngOnDestroy() {
    this.audio.pause();
  };


playerPlay(){
  if (this.audio.paused === true) {
      this.audio.play();
  } else {
    this.audio.pause();
    }
  }
  playerNext() {
    this.onChanged.emit(
      {
        id : this.audio.id,
        command : 'next'
      }
    );
  }

  playerPrev() {
    this.onChanged.emit(
      {
        id : this.audio.id,
        command : 'prev'
      }
    );
  }

  shuffle() {
    this.onChanged.emit(
      {
        id : this.audio.id,
        command : 'shuffle'
      }
    );
  }

@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
     this.playerPlay();
    }

    if (event.keyCode === 39) {
      event.preventDefault();
      event.stopPropagation();
     this.playerNext();
    }

    if (event.keyCode === 37) {
      event.preventDefault();
      event.stopPropagation();
     this.playerPrev();
    }

    if (event.keyCode === 40) {
      event.preventDefault();
      event.stopPropagation();
      if (this.audio.volume >= 0.05)
     this.audio.volume = this.audio.volume - 0.05;
    }

    if (event.keyCode === 38) {
      event.preventDefault();
      event.stopPropagation();
      if (this.audio.volume <= 1)
     this.audio.volume = this.audio.volume + 0.05;
    }

    if (event.keyCode === 82) {
      event.preventDefault();
      event.stopPropagation();
     this.shuffle();
    }
}

}


