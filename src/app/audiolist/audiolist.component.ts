import { Component, OnInit, Output, Input , OnDestroy, OnChanges, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { AdminService } from './../adm/admin.service';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import * as $ from 'jquery';

import {Router} from '@angular/router';
import { HeartService } from './heart.service';


@Component({
  selector: 'app-audiolist',
  templateUrl: './audiolist.component.html',
  styleUrls: ['./audiolist.component.scss'],
  providers: [PlaylistService,AdminService]
})

export class AudiolistComponent implements OnInit {
  @Output() onData = new EventEmitter<any>();

  @Input() playlist;
  @Input() type;
  lorem  =  {};
  sid = localStorage.getItem('sid');
  my_status = localStorage.getItem('status');
  loop;
  list;
  dark;
  videoUrl;
  popOverMobileTrack;
  overMyPlaylists;
  private querySubscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private heartService : HeartService
  ) {}

  ngOnInit() {

     if (localStorage.getItem('list') == 'true') {
      this.list = true;
     }
     else {
       this.list = false;
     }


     this.heartService.from_player.subscribe(res => {

    
    
      if (res == 'next') {
        this.playerNext(1);
      } 

      if (res == 'prev') {
        this.playerNext(-1);
      } 

      if (res == 'stop') {
        console.log('add pause effect');
      //  let coin =  this.playlist.findIndex(x => x._id == this.heartService.track_active.id);  
      //    this.playlist[coin].paused_on_track = true;
      } 
    
     });

   
  };

  ngOnChanges() {
  }

  // ********

  addtoData(track) {
    console.log(track);
    this.onData.emit(track);
  }
  // ********

 

  playerNext(index){
   
    if (!this.heartService.track_active) {
      let new_track = this.playlist[0];
      this.send_track(new_track);
      if (index == '-1') new_track = this.playlist[this.playlist.length - 1];
    }
    else {
      let active_track =  this.playlist.findIndex(x => x._id == this.heartService.track_active.id);
      let new_track = this.playlist[(active_track+index)];
      this.send_track(new_track);
    }
  
  }

  send_track(track){
    this.onChanged(track);
    this.heartService.track.emit(track);
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
  if (!this.sid) {
    this.router.navigate(['/login']);  
  }
  else {
    // console.log(i);
  this.playlistService.pushLikedTrack({'sid': this.sid, 'track' : i}).subscribe(res => {
  });
}
  // console.log(i, '-' , i.liked);
}
removeTrack(i,id,active) {
  if (active)  this.playerNext(1);

  this.playlistService.pushRemoveTrack({'sid': this.sid, 'track' : i}).subscribe(res => {
  });

  this.playlist.splice(id,1);
  // console.log(i_id, i, active);  
}


darkMode(){
 console.log('wiil be soon');
  this.dark = !this.dark;
  $('body').toggleClass('dark');
}


showVideo(url){
if (url) this.videoUrl = 'https://www.youtube.com/embed/' + url + '?autoplay=1&rel=0';
else this.videoUrl = '';



//  else { this.videoUrl = url; }

}


closeMobilePopOver() {
  this.popOverMobileTrack = '';
}


getMyPlaylists() {
  this.playlistService.getMyPlaylists(this.sid).subscribe(res => {
    this.overMyPlaylists = res;
    console.log(res);
  })
}


@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) { 
  if (document.activeElement.tagName == 'INPUT') { return; }


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
    

    if (event.keyCode === 39 || event.keyCode === 69 ) {
      event.preventDefault();
      event.stopPropagation();
     this.playerNext(1);
    }

    if (event.keyCode === 37 || event.keyCode === 81) {
      event.preventDefault();
      event.stopPropagation();
     this.playerNext(-1);
    }

 


}

}




