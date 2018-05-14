import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AudioService {


host = 'http://audline.xyz/api/?set='

     constructor(private http: Http) { }

//     getPlaylist() {
//      return this.http.get('https://audline.net/api/?name=api&random_tracks=1')
//          .map(res  => res.json());
//  }

//  getPlaylistV2() {
//              return this.http.get('http://localhost:3000/audio')
//                  .map(res  => res.json());
//          }

//     getPlaylistByBand(band) {
//      return this.http.get('https://audline.net/api/?name=api&band=' + band)
//          .map(res  => res.json());
//  }

//  getPlaylistBySearchV1(search) {
//          return this.http.get('https://audline.net/api/?name=api&search=' + search)
//              .map(res  => res.json());
//      }

//      getPlaylistBySearch(search) {
//              return this.http.get('http://localhost:3000/search?q=' + search)
//                  .map(res  => res.json());
//          }

         getPlaylistByGenre(genre) {
                     return this.http.get('http://localhost:3000/search?g=' + genre)
                         .map(res  => res.json());
                 }

//      getPlaylistByGenreV1(genre) {
//              return this.http.get('https://audline.net/api/?name=api&genre=' + genre)
//                  .map(res  => res.json());
//          }

  getMyPlaylist(sid) {
                     return this.http.get(`${this.host}my_list&sid=${sid}`)
                         .map(res  => res.json());
            }

        //     getMyBlackPlaylist(sid) {
        //              return this.http.get('http://localhost:3000/get_my_blacklist?sid=' + sid)
        //                  .map(res  => res.json());
        //     }


//             getPlaylistByBandV2(band) {
//                      return this.http.get('http://localhost:3000/band?band=' + band)
//                          .map(res  => res.json());
//                  }


                 


        audGetAudio() {
                     return this.http.get(this.host + 'audio')
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



            getMyBlackPlaylist(sid) {
                     return this.http.get(`${this.host}my_blacklist&sid=${sid}`)
                         .map(res  => res.json());
            }


 

  
}
