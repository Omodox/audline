import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AdminService {

  addpanel;
  addplaylist;

  constructor(private http: Http) { }

  newTrack(){
   this.addpanel =  !this.addpanel;

  }

  newPlaylist(){
    this.addplaylist =  !this.addplaylist;

   }

  addNewTrack(track,sid){
    return this.http.get(`http://audline.xyz/api/?set=adm_add_track&name=${track.name}&&performer_name=${track.performer_name}&track_id=${track.url}&sid=${sid}`)
       .map(res  => res.json());
}

}
