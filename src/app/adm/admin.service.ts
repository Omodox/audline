import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  addpanel;

  constructor() { }

  newTrack(){
   this.addpanel =  !this.addpanel;
  }

}
