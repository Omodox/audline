import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaylistService {

     constructor(private http: Http) { }


 pushLikedTrack(arr) {
     return this.http.post('http://localhost:3000/my_playlist?track=', arr)
  .map(res  => res.json());
   }


   login(msg) {
         return this.http.post('http://localhost:3000/login',msg).map(res  => res.json());
     }


}
