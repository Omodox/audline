import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  rooms = [
    {
      'name' : 'Room 1',
      'url' : 'room_1'
    },
    {
      'name' : 'Room 2',
      'url' : 'room_2'
    },

    {
      'name' : 'Room 3',
      'url' : 'room_3'
    },

    {
      'name' : 'Room 4',
      'url' : 'room_4'
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
