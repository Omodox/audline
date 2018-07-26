import { Component, OnInit, HostListener } from '@angular/core';
import { HeartService } from '../../audiolist/heart.service';
import * as $ from 'jquery';
import { PlaylistService } from '../../audiolist/playlist.service';

declare let ga: Function;
declare let yaCounter45292596: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  providers: [PlaylistService]
})
export class PlayerComponent implements OnInit {

  constructor(
    private heartService: HeartService,
    private playlistService: PlaylistService) {
  }

  audio = this.heartService.audio;
  track_info;
  active_track = 0;
  loop = false;
  active_track_object;
  mobMenu;


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
      var playerTime = this.audio.duration / 100 * position;
      //  console.log(playerTime);
      this.audio.currentTime = playerTime;
    };

    this.audio.ontimeupdate = () => {
      this.progress = 100 / this.audio.duration * this.audio.currentTime;
    };

    this.audio.onended = () => {
      this.audio.pause();
      this.playerNextTrack();
    };


    this.audio.oncanplay = () => {
      if (this.active_track_object.duration <= 0) {
        let track_duration = this.audio.duration;
        this.playlistService.change_track_time(this.active_track_object.id, track_duration).subscribe(res => {
          // console.log(res);
        });
        this.active_track_object.duration = this.audio.duration;
        // this.playerPlay();
      }
      this.playlistService.trackAudite(this.active_track_object.id).subscribe(res => {
        // console.log(res);
      });
      this.audio.play;
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
    else {
      localStorage.setItem('volume', '0.75');
      this.audio.volume = 0.75;
    }

    if (window.innerWidth < 769) {
      this.audio.volume = 1;
    }



  }

  playerPlay() {
    this.playerVolume();
    if (this.audio.paused === true) {
      this.audio.play();
      this.mobMenu = !this.mobMenu;
    } else {
      this.audio.pause();
      this.playerStopTrack();
    }
  }


  playerLoop() {
    this.audio.loop = !this.audio.loop;
    this.loop = this.audio.loop;
  }



  addtoPlayer(new_track) {


    if (this.active_track != new_track.id) {

      this.audio.src = new_track.url;
      this.playerUpdateTrackInfo(new_track);
      this.active_track = new_track.id;
      this.active_track_object = new_track;


      let history = localStorage.getItem('history');

      localStorage.setItem('history', new_track.id);


    }

    this.playerPlay();


    ga('send', 'event', 'Music', 'play', this.active_track_object.performer_name + ' - ' + this.active_track_object.name);
    if (typeof yaCounter45292596 != 'undefined') {
      yaCounter45292596.hit(`http://audline.net/track/${this.active_track_object.id}`,
        { title: `Слушать онлайн песню ${this.active_track_object.performer_name} - ${this.active_track_object.name} или скачать` });
    }
  }

  playerUpdateTrackInfo(new_track) {
    // this.track_info = document.getElementById('track_info');
    // this.track_info.innerHTML = new_track.performer_name  + ' - ' + new_track.name;
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

  newsort() {
    this.heartService.from_player.emit('sort');
  }




  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') { return; }

    const player = this;



    if (event.keyCode === 32) {
      event.preventDefault();
      event.stopPropagation();
      player.playerPlay();

    }


    if (event.keyCode === 40 || event.keyCode === 83) {
      event.preventDefault();
      event.stopPropagation();
      if (Math.floor(player.audio.volume * 100) >= 5)
        player.audio.volume = player.audio.volume - 0.05;
      if (player.audio.volume <= 0.06) player.audio.volume = 0;
      localStorage.setItem('volume', String(player.audio.volume));
    }

    if (event.keyCode === 38 || event.keyCode === 87) {
      event.preventDefault();
      event.stopPropagation();
      if (Math.floor(player.audio.volume * 100) <= 100)
        player.audio.volume = player.audio.volume + 0.05;
      if (player.audio.volume >= 0.94) player.audio.volume = 1;
      localStorage.setItem('volume', String(player.audio.volume));
    }

    if (event.keyCode === 68) {
      event.preventDefault();
      event.stopPropagation();
      if ((player.audio.duration - player.audio.currentTime) > 5)
        player.audio.currentTime = player.audio.currentTime + 5;
    }


    if (event.keyCode === 65) {
      event.preventDefault();
      event.stopPropagation();
      if (player.audio.currentTime >= 5)
        player.audio.currentTime = player.audio.currentTime - 5;
    }
  }

}