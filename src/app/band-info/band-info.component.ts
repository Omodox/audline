import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-band-info',
  templateUrl: './band-info.component.html',
  styleUrls: ['./band-info.component.scss']
})
export class BandInfoComponent implements OnInit {

  constructor() { }

  @Input() item;

  ngOnInit() {
    console.log(this.item);
  }


}
