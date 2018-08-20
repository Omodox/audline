import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpManagerService {

  constructor(private http: Http) { }

  trackParser(performer) {
    return this.http.get(`http://zk.fm/artist/${performer}`);
}

}
