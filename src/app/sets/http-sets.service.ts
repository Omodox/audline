import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpSetsService {

  constructor(private http: Http) { }


  getPlaylists(sid){
    return this.http.get(`http://audline.xyz/api/?set=playlists&sid=${sid}`)
       .map(res  => res.json());
}


}


