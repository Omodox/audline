import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {

  constructor() { }

  rooms = [
    {
      'name' : 'Set 1',
      'url' : 'room_1'
    },
    {
      'name' : 'set 2',
      'url' : 'room_2'
    },

    {
      'name' : 'set 3',
      'url' : 'room_3'
    },

    {
      'name' : 'set 4',
      'url' : 'room_4'
    },

    {
      'name' : 'set 4',
      'url' : 'staff'
    },
  ]



  ngOnInit() {
  }

}
