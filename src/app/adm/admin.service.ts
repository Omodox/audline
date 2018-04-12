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
    return this.http.post('http://localhost:3000/newtrack',{track, sid})
       .map(res  => res.json());
}

}
