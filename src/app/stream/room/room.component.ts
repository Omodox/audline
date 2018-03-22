  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { ActivatedRoute} from '@angular/router';
  import {Subscription} from 'rxjs/Subscription';

import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ChatService }   from '../stream.service';
  
  @Component({
    selector: 'app-band',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    providers: [ChatService]
  })
  export class RoomComponent implements OnInit {
  
    id = '';
  
      private routeSubscription: Subscription;
      private querySubscription: Subscription;
     constructor(private route: ActivatedRoute, private chatService: ChatService){
  
          this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
      }
  

  messages = [];
  connection;
  message;
  audio;  

  sendMessage() {
    this.message = 'Lorem text';
    this.chatService.sendMessage(this.message);
    this.message = '';

  }

  ngOnInit() {

    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
      this.audio = document.getElementById('player');
      this.audio.pause();
    })

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  }