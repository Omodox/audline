import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpSetsService {

  constructor(private http: Http) { }


  getPlaylists(sid){
    return this.http.get(`https://audline.net/api/?set=playlists&sid=${sid}&time=${this.unixtime()}`)
       .map(res  => res.json());
}


  getPlaylist(sid,id) {
    return this.http.get(`https://audline.net/api/?set=playlist&sid=${sid}&url=${id}&time=${this.unixtime()}`)
       .map(res  => res.json());
}

  setPlaylist(sid,form){
    return this.http.get(`https://audline.net/api/?set=new_playlist&sid=${sid}&name=${form.name}&img=${form.img}`)
    .map(res  => res.json());

  }


 unixtime(){
  return new Date().getTime()/1000
  }


}


