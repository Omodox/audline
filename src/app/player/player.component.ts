import { Component, OnInit, Input, Output, EventEmitter,  OnChanges, OnDestroy } from '@angular/core';
import { Command } from 'protractor';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  constructor() { }

  @Input() item;
  @Output() onChanged = new EventEmitter<boolean>();

  ngOnInit() {

this.audio = new Audio();
this.audio.src = 'https://zf.fm/download/7226126';
this.audio.volume = 0.3;

this.audio.onpause = () => {
console.log('paused Event');
};

this.audio.onended = () => {
  this.playerNext();
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

}


