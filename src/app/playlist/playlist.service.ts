import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PlaylistService {

     constructor(private http: Http){}

    getPlaylist() {
     return this.http.get('https://audline.net/api/?name=api&random_tracks=1')
         .map(res  => res.json());
 }

    getPlaylistByBand(band) {
     return this.http.get('https://audline.net/api/?name=api&band=' + band)
         .map(res  => res.json());
 }
}
