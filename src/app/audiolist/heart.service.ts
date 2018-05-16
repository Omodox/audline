import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class HeartService {

  constructor() { }

  audio = new Audio;
  track_id: EventEmitter<any> = new EventEmitter();

}
