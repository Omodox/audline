import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaylistService {

     constructor(private http: Http) { }


 server = 'https://audline.com/api/'


 pushLikedTrack(arr) {
     return this.http.get(`${this.server}?set=like&sid=${arr.sid}&track=${arr.track.id}&sts=${arr.track.liked}`)
  .map(res  => res.json());
   }


   pushRemoveTrack(arr) {
 
       return this.http.get(`${this.server}?set=disclike&sid=${arr.sid}&track=${arr.track.id}`)
   
    .map(res  => res.json());
     }


     pushPlayerError(arr, err) {
           return this.http.get(`${this.server}?set=player_error&track_name=${arr.name}&track_performer=${arr.performer_name}&track_id=${arr.id}&mp3=${arr.url}&err_code=${err.code}&err_message=${err.message}`)
        .map(res  => res.json());
         }


     getMyPlaylists(sid,track_id) {
             return this.http.get(`${this.server}?set=my_playlists&sid=${sid}&track=${track_id}&time=${this.unixtime()}`)
                 .map(res  => res.json());
    }


    set_playlist_track(sid,track_id,playlist) {

        return this.http.get(`${this.server}?set=set_playlist_track&sid=${sid}&track=${track_id}&playlist=${playlist}&time=${this.unixtime()}`)
        .map(res  => res.json());
        
    }


    updateTrack(sid, track) {

        return this.http.get(`${this.server}?set=update_track&sid=${sid}&track=${track.id}&name=${track.name}&performer_name=${track.performer_name}&duration=${track.duration}&youtube_code=${track.youtube_code}&genre=${track.genre}&url=${track.url}`)
        .map(res  => res.json());
        
    }


    change_track_time(track_id,track_time) {
        // console.log(`${this.server}?set=change_track_time&track=${track_id}&track_time=${track_time}`);

        return this.http.get(`${this.server}?set=change_track_time&track=${track_id}&track_time=${track_time}`)
        .map(res  => res.json());
    }


    trackAudite(track_id) {

        return this.http.get(`${this.server}?set=track_audite&track=${track_id}`)
        .map(res  => res.json());
    }



    


    unixtime(){
        return new Date().getTime()/1000
        }
      




}
