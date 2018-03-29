import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

     constructor(private http: Http) { }

    login(msg) {
         return this.http.post('http://localhost:3000/login',msg).map(res  => res.json());
     }



 

}
