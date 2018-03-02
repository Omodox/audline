import { Component, OnInit, Output, Input , OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { PlayerService } from '../player/player.service';

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
  var_event;

  constructor(private playlistService: PlaylistService, private playerService: PlayerService ) { }

  ngOnInit() {
    this.uploadPlaylist();
  };
  uploadPlaylist() {
    if (this.bandurl) {
      this.playlistService.getPlaylistByBand(this.bandurl).subscribe(res => {
        this.playlist = res; this.playerFirstTrack(res,false); });
    }

    else {
      this.playlistService.getPlaylist().subscribe(res => {
        this.playlist = res;  this.playerFirstTrack(res,false); });
    }

  }

  playerFirstTrack(res, reload) {
    let player =  document.getElementById('player');
    if (player.playlist == undefined || reload == true) {
    player.playlist = res ;
    player.src = res[0].url;
    player.idt = 0;
    // console.log('loaded');
    }
  }
  addtoPlayer(id) {
    this.lorem = {
      trackid :  id,
      playerSt : document.getElementById('player').paused
    };
    // console.log( document.getElementById('player').playlist[document.getElementById('player').idt].id);
    if (document.getElementById('player').playlist[document.getElementById('player').idt].id != id)
   this.playerFirstTrack(this.playlist, true);
  }

  onChanged(activeTrack){
    let active_track = this.playlist.findIndex(x => x.id == activeTrack);
     this.changeActive(active_track);
  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  changeActive(id) {
   let old_item = this.playlist.find(x => x.isactive == true);
   if (old_item) old_item.isactive = false;
      this.playlist[id].isactive = true;
  }
}




