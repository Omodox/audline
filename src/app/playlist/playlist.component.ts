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
  playlist;

  constructor(private playlistService: PlaylistService, private playerService: PlayerService ) { }

  ngOnInit() {

    if (this.bandurl) {
      this.playlistService.getPlaylistByBand(this.bandurl).subscribe(res => {
        this.playlist = res; document.getElementById('player').playlist = res ; });
    }

    else {
      this.playlistService.getPlaylist().subscribe(res => {
        this.playlist = res; });
    }

  };

  addtoPlayer(Track,listid) {
 this.lorem = {
  track : Track,
  id : listid
 };
 this.changeActive(Track);
  }
  onChanged(activeTrack){
    if (activeTrack.command == 'next' || activeTrack.command == 'prev'){
      if (activeTrack.command == 'next') {
        activeTrack.id++;
      }
      if (activeTrack.command == 'prev') {
        activeTrack.id--;
      }
      this.lorem = {
        // track : this.playlist.find(x => x.id == activeTrack.id);
        track : this.playlist[activeTrack.id],
        id : activeTrack.id
      };
      this.changeActive(this.playlist[activeTrack.id]);
  }
  if (activeTrack.command == 'shuffle') {
  this.playlist = this.shuffle(this.playlist);

  }

  }
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

  changeActive(item) {
   let old_item = this.playlist.find(x => x.isactive == true);
   if (old_item) old_item.isactive = false;
      item.isactive = true;
      // console.log(item);
  }
}




