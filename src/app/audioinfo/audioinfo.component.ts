import { Component, OnInit, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-audioinfo',
  templateUrl: './audioinfo.component.html',
  styleUrls: ['./audioinfo.component.scss']
})
export class AudioinfoComponent implements OnInit {

  @Output() genre = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  paylistByGengre(genreType) {
    this.genre.emit(genreType);
  }


}
