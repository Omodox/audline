import { Component, OnInit, Output, Input , OnDestroy, OnChanges, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayerService } from './player.service';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-audiolist',
  templateUrl: './audiolist.component.html',
  styleUrls: ['./audiolist.component.scss'],
  providers: [PlaylistService,PlayerService]
})

export class AudiolistComponent implements OnInit {
  @Output() onData = new EventEmitter<any>();
  progress: number;
  progress_line: HTMLElement;
  @Input() playlist;
  @Input() type;
  lorem  =  {};
  sid = localStorage.getItem('sid');
  loop;
  list;
  videoUrl;
  private querySubscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

     if (localStorage.getItem('list') == 'true') {
      this.list = true;
     }
     else {
       this.list = false;
     }

    this.progress_line = document.getElementById('trackname');
    this.progress_line.onclick = (e) => {
    //  console.log(e);
     var offset = this.progress_line.getBoundingClientRect();
     var position = 100 / offset.width * (e.clientX - offset.left);
    //  console.log(position);
     var playerTime =  this.playerService.audio.duration /100 * position;
    //  console.log(playerTime);
    this.playerService.audio.currentTime = playerTime;
    };
  
    this.playerService.audio.ontimeupdate = () => {
      this.progress =  100 / this.playerService.audio.duration * this.playerService.audio.currentTime;
      };

    this.playerService.audio.onended = () => {
      this.playerNext();
      };


  };

  ngOnChanges() {
  }

  // ********

  addtoData(track) {
    console.log(track);
    this.onData.emit(track);
  }
  // ********

  addtoPlayer(new_track) {
  this.playerService.addtoPlayer(new_track);
  this.onChanged(new_track);
  }

  playerNext(){
    let active_track =  this.playlist.findIndex(x => x._id == this.playerService.audio.ida);
    let new_track = this.playlist[(active_track+1)];
    this.playerService.addtoPlayer(new_track);
    this.onChanged(new_track);
  }

  playerPrev(){
    let active_track =  this.playlist.findIndex(x => x._id == this.playerService.audio.ida);
    let new_track = this.playlist[(active_track-1)];
    this.playerService.addtoPlayer(new_track);
    this.onChanged(new_track);
  }

  onChanged(activeTrack) {
    const active_track = this.playlist.findIndex(x => x._id == activeTrack._id);
     const old_item = this.playlist.find(x => x.isactive == true);
      if (old_item) { old_item.isactive = false; }
         this.playlist[active_track].isactive = true;
  }

  loadFromPlayer() {
    let player =  <any>document.getElementById('player');
    this.playlist = player.playlist;
  }


listTo() {
  this.list = !this.list;
  localStorage.setItem('list', String(this.list));
}

playerLoop() {
  const player =  <any>document.getElementById('player');
  player.loop = !player.loop;
  this.loop = player.loop;
}


shuffle() {
  let a = this.playlist;
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  let ida = a.findIndex(x => x.isactive == true);
  if (ida > 0) {
    let r = a[0];
    a[0] = a[ida];
    a[ida] = r;
    ida = 0;
  }
  const player =  <any>document.getElementById('player');
  player.playlist = a;
  player.idt = ida;
  return a;
}


likeTrack(i) {
  i.liked = !i.liked;
  console.log(i);
  this.playlistService.pushLikedTrack({'sid': this.sid, 'track' : i}).subscribe(res => {
  
  });
  // console.log(i, '-' , i.liked);
}
removeTrack(i,id,active) {
  if (active)  this.playerNext();
  this.playlist.splice(id,1);
  // console.log(i_id, i, active);  
}


showVideo(url){
if (url) this.videoUrl = 'https://www.youtube.com/embed/' + url + '?autoplay=1&rel=0';
else this.videoUrl = '';



//  else { this.videoUrl = url; }

}

@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) { 
  if (document.activeElement.tagName == 'INPUT') { return; }

  const player = this.playerService; 

    if (event.keyCode === 82) {
      event.preventDefault();
      event.stopPropagation();
      this.shuffle();

    }
    if (event.keyCode === 70) {
      event.preventDefault();
      event.stopPropagation();
      this.listTo();

    }
    
    if (event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      player.playerPlay();

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
      if (player.audio.volume >= 0.05)
      player.audio.volume = player.audio.volume - 0.05;
     localStorage.setItem('volume', player  .audio.volume);
    }

    if (event.keyCode === 38 || event.keyCode === 87) {
      event.preventDefault();
      event.stopPropagation();
      if (player.audio.volume <= 1)
      player.audio.volume = player.audio.volume + 0.05;
     localStorage.setItem('volume', player.audio.volume);
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
      if (player.currentTime >=  5) 
      player.audio.currentTime = player.currentTime - 5;
    }
}

}




