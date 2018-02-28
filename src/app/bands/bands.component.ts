import { Component, OnInit } from '@angular/core';
import { BandsService } from './bands.service';
@Component({
  selector: 'app-bands',
  templateUrl: './bands.component.html',
  styleUrls: ['./bands.component.scss'],
  providers : [BandsService]

})
export class BandsComponent implements OnInit {

  bands;

  constructor( private bandsService: BandsService ) { }

  ngOnInit() {
    this.bandsService.getBands().subscribe(res => {
      this.bands = res });
  };

}
