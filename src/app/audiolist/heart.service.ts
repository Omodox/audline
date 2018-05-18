import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HeartService {

  constructor() { }


  track: EventEmitter<any> = new EventEmitter();
  track_active;
  from_player :  EventEmitter<any> = new EventEmitter();
  filter = 'random';
  new_filter :  EventEmitter<any> = new EventEmitter();

}
