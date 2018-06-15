import { Component, OnInit, Output, Input , OnDestroy, OnChanges, HostListener ,  } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { AdminService } from './../adm/admin.service';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import * as $ from 'jquery';

import {Router} from '@angular/router';
import { HeartService } from './heart.service';
declare let ga: Function;


@Component({
  selector: 'app-audiolist',
  templateUrl: './audiolist.component.html',
  styleUrls: ['./audiolist.component.scss'],
  providers: [PlaylistService, AdminService]
})

export class AudiolistComponent implements OnInit {
  @Output() onData = new EventEmitter<any>();

  @Input() playlist;
  @Input() type;
  sid = localStorage.getItem('sid');
  my_status = localStorage.getItem('status');
  list;
  dark;
  videoUrl;
  popOverMobileTrack;
  overMyPlaylists;
  filter;
  SubFromPlayerToRemoveAfterDesctroy;
  edit_track_obj;
  overSharePanel;
  private querySubscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private heartService: HeartService
  ) {}


  ngOnInit() {



     if (localStorage.getItem('list') == 'true') {
      this.list = true;
     }
     else {
       this.list = false;
     }


   this.SubFromPlayerToRemoveAfterDesctroy =   this.heartService.from_player.subscribe(res => {

      if (res === 'next') {
        this.playerNext(1);
      }

      if (res === 'prev') {
        this.playerNext(-1);
      }

      if (res === 'stop') {
        console.log('add pause effect');
      //  let coin =  this.playlist.findIndex(x => x._id == this.heartService.track_active.id);  
      //    this.playlist[coin].paused_on_track = true;
      } 

      if (res === 'sort') {
      this.shuffle();
      }

     });

  };


  ngOnDestroy() {
    this.SubFromPlayerToRemoveAfterDesctroy.unsubscribe();
  }

  newFilter(res) {
    console.log(res);
    this.heartService.new_filter.emit(res);
  }

  ngOnChanges() {
  }

  // ********

  addtoData(track) {
    console.log(track);
    this.onData.emit(track);
  }
  // ********


  playerNext(index){

    // console.log(this.heartService.track_active);
    if (!this.heartService.track_active) {
      let new_track = this.playlist[0];
      this.send_track(new_track);
      if (index == '-1') new_track = this.playlist[this.playlist.length - 1];
    }
    else {
      let active_track =  this.playlist.findIndex(x => x.id == this.heartService.track_active.id);
      let new_track = this.playlist[(active_track+index)];
      this.send_track(new_track);
    }

  }

  send_track(track){
    this.onChanged(track);
    this.heartService.track.emit(track);

  }

  send_pause() {

   if (!this.heartService.audio.paused)
      this.send_track(this.heartService.track_active);
  }


  onChanged(activeTrack) {
    const active_track = this.playlist.findIndex(x => x.id == activeTrack.id);
     const old_item = this.playlist.find(x => x.isactive == true);
      if (old_item) { old_item.isactive = false; }
         this.playlist[active_track].isactive = true;
  }

  loadFromPlayer() {
    let player =  <any>document.getElementById('player');
    this.playlist = player.playlist;
  }


  downloadTrack(track) {
   
  ga('send', 'event', 'Music', 'download', track.performer_name + ' - ' + track.name );

  window.location.replace(track.url);
  }

  shareTrack(track) {
    
    this.overSharePanel = track;
    this.overSharePanel.full_url = "http://audline.net/track/"+track.id;
    ga('send', 'event', 'Music', 'share', track.performer_name + ' - ' + track.name );

  }


listTo() {
  this.list = !this.list;
  localStorage.setItem('list', String(this.list));
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

  ga('send', 'event', 'Interface', 'Mode', `Dark - ${this.dark}` );
}

morebuttons(track) {
  track.more_buttons =  !track.more_buttons;
  console.log(track.more_buttons);

}


showVideo(track){
 let youtube =  track.youtube_code;
if (youtube) this.videoUrl = 'https://www.youtube.com/embed/' + youtube + '?autoplay=1&rel=0';
else this.videoUrl = '';
ga('send', 'event', 'Video', 'Play', `${track.performer_name} - ${track.name}` );

this.send_pause();
// console.log(youtube);
//  else { this.videoUrl = url; }

}


closeMobilePopOver() {
  this.popOverMobileTrack = '';
}


sendEditTrack(track) {


  let editted_track = this.playlist.find(x => x.id == track.value.id);

  editted_track.youtube_code = track.value.youtube_code;



  console.log(track.value);
  this.playlistService.updateTrack(this.sid,track.value).subscribe(res => {
    console.log(res);
  });

}


getMyPlaylists(track) {
  this.playlistService.getMyPlaylists(this.sid,track.id).subscribe(res => {
    this.overMyPlaylists = res;
    this.overMyPlaylists.track = track;
    console.log(this.overMyPlaylists);
  })
}

set_playlist_track(track,playlist,i) {
  console.log('ok');
  console.log(track,playlist);
  this.playlistService.set_playlist_track(this.sid,track.id,playlist).subscribe(res => {
    // console.log(res);
  });
this.overMyPlaylists[i].active = !this.overMyPlaylists[i].active;
  
}


@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) { 
  if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') { return; }


    if (event.keyCode === 82) {
      event.preventDefault();
      event.stopPropagation();
      this.shuffle();

    }
    // if (event.keyCode === 70) {
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.listTo();
    // }
    

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




