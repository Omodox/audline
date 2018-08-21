import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuHttpService {


  host = 'https://audline.com/api/?set='

  constructor(private http: Http) { }


  getMoneyImg() {
    return  this.http.get(`${this.host}money&time=${this.unixtime()}`)
      .map(res => res.json());
  }


  getSearchHelper(filter) {
    return  this.http.get(`${this.host}performers&filter=${filter}`)
      .map(res => res.json());
  }



  unixtime() {
    return new Date().getTime() / 1000
  }



}
