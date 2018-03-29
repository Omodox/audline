import { Component, OnInit, Output, Input , OnDestroy, OnChanges, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayerService } from '../player/player.service';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  providers: [PlaylistService, PlayerService]
})

export class PlaylistComponent implements OnInit {
  @Input() bandurl;
  lorem  =  {};
  item ;
  playlist;
  loop;
  var_event;
  search;
  list;
  last_acrive_track;
  transform;
  videoUrl;
  private querySubscription: Subscription;

  constructor(
    private playlistService: PlaylistService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {
    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
            this.search = queryParam['search'];
            if (this.search) {
              this.uploadPlaylist();
            }

        }
    );
  }

  ngOnInit() {
     if (localStorage.getItem('list') == 'true') {
      this.list = true;
     }
     else {
       this.list = false;
     }
    this.uploadPlaylist();

  };

  ngOnChanges() {
  }

  uploadPlaylist() {

    if (this.search) {
      this.playlistService.getPlaylistBySearch(this.search).subscribe(res => {
        this.playlist = res; this.playerFirstTrack(res,false); });
    }

    else

    if (this.bandurl) {
      this.playlistService.getPlaylistByBand(this.bandurl).subscribe(res => {
        this.playlist = res; this.playerFirstTrack(res,false); });
    }

    else {
      this.playlistService.getPlaylist().subscribe(res => {
        this.playlist = res;  this.playerFirstTrack(res,false); });
    }
  }


  paylistByGengre(genre){
    console.log(genre);
    this.playlistService.getPlaylistByGenre(genre).subscribe(res => {
      this.playlist = res;  this.playerFirstTrack(res,false); });
  }

  playerFirstTrack(res, reload) {
    let player =  <any>document.getElementById('player');
    if (player.playlist == undefined || reload == true) {
    player.playlist = res;
    player.src = res[0].url;
    player.idt = 0;
    player.ida = res[0].id;
    }
    // console.log(this.playlist);
  }
  addtoPlayer(id) {
    let player = <any>document.getElementById('player');
    this.lorem = {
      trackid :  id,
      playerSt : player.paused
    };
  
    if (player.playlist[player.idt].id != id)
   this.playerFirstTrack(this.playlist, true);
  }

  loadFromPlayer() {
    let player =  <any>document.getElementById('player');
    this.playlist = player.playlist;
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

  onChanged(activeTrack) {
    const active_track = this.playlist.findIndex(x => x.id == activeTrack);
     this.changeActive(active_track);
  }

  changeActive(id) {
    const player =  <any>document.getElementById('player');

      const old_item = this.playlist.find(x => x.isactive == true);
      if (old_item) { old_item.isactive = false; }
         this.playlist[id].isactive = true;
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

likeTrack(i) {
  i.liked = !i.liked;
  console.log(i.liked);
}


showVideo(url){
if (url) this.videoUrl = 'https://www.youtube.com/embed/' + url + '?autoplay=1&rel=0';
else this.videoUrl = '';

let player = <any>document.getElementById('player');
this.addtoPlayer(player.idt);

//  else { this.videoUrl = url; }

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
}

}



