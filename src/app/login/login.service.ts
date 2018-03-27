import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

     constructor(private http: Http) { }

//     getPlaylist() {
//      return this.http.get('https://audline.net/api/?name=api&random_tracks=1')
//          .map(res  => res.json());
//  }


    login(msg) {
         return this.http.post('http://localhost:3000/login',msg).map(res  => res.json());
     }

 

}
