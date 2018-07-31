import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpSetsService } from './http-sets.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss'],
  providers: [HttpSetsService]
})
export class SetsComponent implements OnInit {

  constructor(private httpservices: HttpSetsService) { }

  sid = localStorage.getItem('sid');
  my_sts = localStorage.getItem('status');
  playlists;
  createPlaylist;

  name;
  title;
  description;
  img;
  playlist_id;

  ngOnInit() {

    this.httpservices.getPlaylists(this.sid).subscribe(res => {
      console.log(res);
      this.playlists = res;
    });
  }

  createPlaylistPopUp(item) {
    this.createPlaylist = true;
    if (item) {
      // console.log(item);
      this.name = item.name;
      this.title = item.title;
      this.img = item.img;
      this.description = item.description;
      this.playlist_id = item.id;
    }
  }

  send(form) {
    console.log(form.value);
    this.httpservices.setPlaylist(this.sid, form.value).subscribe(res => {
      console.log(res);
    });
    this.createPlaylist = false;
    this.playlist_id = '';
  }

  closePopUp() {
    this.createPlaylist = false;
    this.playlist_id = '';
    this.name  = '';
    this.title  = '';
    this.img  = '';
    this.description  = '';
  }



}
