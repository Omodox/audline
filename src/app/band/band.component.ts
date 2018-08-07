import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { AudioService } from '../audio/audio.service'

@Component({
  selector: 'app-band',
  templateUrl: './band.component.html',
  styleUrls: ['./band.component.scss'],
  providers : [
    AudioService
  ]
})
export class BandComponent implements OnInit {

  id = '';
  audiolist;
  sid = localStorage.getItem('sid');

    private routeSubscription: Subscription;
    private querySubscription: Subscription;
    constructor(private route: ActivatedRoute, private audioService : AudioService){

        this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    }

  ngOnInit() {
    // this.audioService.getPlaylistByBandV2(this.id).subscribe(res => {
    //   this.audiolist = res;})


      this.audioService.audGetBandPlaylist(this.id).subscribe(res => {

        res.forEach(function(item) {
          item._id = item.id;
      });

        this.audiolist = res;

      if (this.sid) {
            this.audioService.getMyPlaylist(this.sid).subscribe(res => {

            res.forEach(element => {
              let s =  this.audiolist.findIndex(x => x._id == element._id);
                 if (s >= 0) {
                          this.audiolist[s].liked = true;
                          }
                 });
               });

               this.audioService.getMyBlackPlaylist(this.sid).subscribe(res => {
                res.forEach(element => {
                  let s =  this.audiolist.findIndex(x => x._id == element._id);
                     if (s >= 0) {
                      this.audiolist.splice(s,1);
                              }
                     });
                   });
             }

    });



    (function(){
      var D=new Date(),d=<any>document,b='body',ce='createElement',ac='appendChild',st='style',ds='display',n='none',gi='getElementById',lp=d.location.protocol,wp=lp.indexOf('http')==0?lp:'https:';
      var i=d[ce]('iframe');i[st][ds]=n;d[gi]("M403150ScriptRootC668360")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}
      catch(e){var iw=d;var c=d[gi]("M403150ScriptRootC668360");}var dv=iw[ce]('div');dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML=668360;c[ac](dv);
      var s=iw[ce]('script');s.async='async';s.defer='defer';s.charset='utf-8';s.src=wp+"//jsc.marketgid.com/a/u/audline.net.668360.js?t="+D.getFullYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();

  }

}

