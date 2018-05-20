import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AudioService {


host = 'https://audline.net/api/?set='

     constructor(private http: Http) { }



   



  getMyPlaylist(sid) {
                     return this.http.get(`${this.host}my_list&sid=${sid}&time=${this.unixtime()}`)
                         .map(res  => res.json());
            }




        
        audGetAudio(filter) {
                     return this.http.get(this.host + 'audio' + `&filter=${filter}` + `&time=${this.unixtime()}`)
                         .map(res  => res.json());
                 }



        audGetBandPlaylist(band) {
     return this.http.get(this.host + 'band&name=' + band)
         .map(res  => res.json());
 }         


      getPlaylistBySearch(search) {
             return this.http.get(this.host + 'search&q=' + search)
                 .map(res  => res.json());
         }


         getPlaylistByGenre(search) {
                     return this.http.get(this.host + 'genre&q=' + search + `&time=${this.unixtime()}`)
                         .map(res  => res.json());
                 }
        





            getMyBlackPlaylist(sid) {
                     return this.http.get(`${this.host}my_blacklist&sid=${sid}`)
                         .map(res  => res.json());
            }



            unixtime(){
                return new Date().getTime()/1000
                }
              


 

  
}
