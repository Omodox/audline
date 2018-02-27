import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class BandsService {

     constructor(private http: Http){}

    getBands() {
     return this.http.get('https://audline.net/api/?name=api&bands=250')
         .map(res  => res.json());
 };

}
