import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaylistService {

     constructor(private http: Http) { }


 pushLikedTrack(track,sid) {
  console.log(track);    
     return this.http.get('http://localhost:3000/my_playlist?track=' + track + '&sid=' + sid)
  .map(res  => res.json());
   }

}
