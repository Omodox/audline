import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class VideoService {

     constructor(private http: Http){}

    getVideo() {
     return this.http.get(' https://audline.net/api/?set=video')
         .map(res  => res.json());
 };

 

}
