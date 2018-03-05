import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class BandinfoService {

     constructor(private http: Http){}

    getBand(band) {
     return this.http.get('https://audline.net/api/?name=api&band_url=' + band )
         .map(res  => res.json());
 }
}
