import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

     constructor(private http: Http) { }

 server = 'https://audline.net/api/?';

    login(msg) {
         return this.http.get(`${this.server}set=login&email=${msg.email}&password=${msg.password}`).map(res  => res.json());
     }

     signpUp(msg){
        return this.http.get(`${this.server}set=reg&email=${msg.email}&password=${msg.password}&password2=${msg.password2}`).map(res  => res.json());
     }



 

}
