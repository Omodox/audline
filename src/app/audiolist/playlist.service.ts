import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaylistService {

     constructor(private http: Http) { }


 server = 'http://audline.xyz/api/'


 pushLikedTrack(arr) {
     return this.http.get(`${this.server}?set=like&sid=${arr.sid}&track=${arr.track.id}`)
  .map(res  => res.json());
   }


   pushRemoveTrack(arr) {
    console.log(arr);
       return this.http.get(`${this.server}?set=disclike&sid=${arr.sid}&track=${arr.track.id}`)
   
    .map(res  => res.json());
     }




}
