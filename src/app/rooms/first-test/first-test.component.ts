import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


import { ChatService }   from './fisrt-test.service';


@Component({
  selector: 'app-first-test',
  templateUrl: './first-test.component.html',
  styleUrls: ['./first-test.component.scss'],
  providers: [ChatService]
})
export class FirstTestComponent implements OnInit, OnDestroy {

  messages = [];
  connection;
  message;

  constructor(private chatService: ChatService) { }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';

  }

  ngOnInit() {

    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);

    })

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
