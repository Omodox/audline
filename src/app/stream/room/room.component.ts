  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { ActivatedRoute} from '@angular/router';
  import {Subscription} from 'rxjs/Subscription';

import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ChatService }   from '../stream.service';
import { AudioService }   from '../../audio/audio.service';
  
  @Component({
    selector: 'app-band',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    providers: [ChatService, AudioService]
  })
  export class RoomComponent implements OnInit {
  
    progress_line: any;
    id = '';
    audiolist;
    sid = localStorage.getItem('sid');
    
    
  
      private routeSubscription: Subscription;
      private querySubscription: Subscription;
     constructor(
       private route: ActivatedRoute,
        private chatService: ChatService,
        private audioService : AudioService
        ){
  
          this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
      }

      tabs = [
        {
          'name' : 'room',
          'state' : true,
        },
        {
          'name' : 'my',
          'state' : false,
        },
        {
          'name' : 'history',
          'state' : false,
        },
        {
          'name' : 'chat',
          'state' : false,
        },
        {
          'name' : 'users',
          'state' : false,
        }
      ]

      opentab(tab) {
        let x = this.tabs.find(xx => xx.state == true);
        x.state = false;
        this.tabs[tab].state = true;

        switch(tab) {
          case 0: { this.audiolist = [] ; break;}
          case 1: {
            this.audioService.getMyPlaylist(this.sid).subscribe(res => {
              this.audiolist = res; }); break;}
          case 3: {
              break;
          }
          case 4: {
                break;  
          }
      }
    }
  
  messages = [];
  connection;
  message;
  audio;

  sendMessage() {
    this.message = 'Lorem text';
    this.chatService.sendMessage(this.message,this.id);
    this.message = '';

  }

  ngOnInit() {
    this.connection = this.chatService.getMessages(this.id).subscribe(message => {
      // this.messages.push(message);
      const msg = message;

      console.log(message);
      

      if ((message as any).type == 'command') {
          if ((message as any).text == 'play') {
            this.playerService.playerPlay();
          }
          if ((message as any).text == 'next') {
            let active_track =  this.audiolist.findIndex(x => x.id == this.playerService.audio.ida);
            let new_track = this.audiolist[(active_track+1)];
            this.playerService.addtoPlayer(new_track);
          }

          if (typeof((message as any).text) == 'object') {
            // console.log(msg.text);
            this.audiolist.push((message as any).text);
          }
      }
    })
    

    // this.audioService.getPlaylist().subscribe(res => {
    //   this.audiolist = res; });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  onData(track) {
    this.chatService.sendTrack(track,this.id);
  }

  roomPlayerPlay() {
    this.progress_line = <any>document.getElementById('progress_line');
    this.progress_line.style.background = '#e53935';
  this.chatService.sendCommand('play',this.id);
  }

  roomPlayerNext() {
    this.chatService.sendCommand('next',this.id);
  }


  }