import { Component, OnInit, Input } from '@angular/core';
import { BandinfoService } from '../bandinfo/bandinfo.service';

@Component({
  selector: 'app-bandinfo',
  templateUrl: './bandinfo.component.html',
  styleUrls: ['./bandinfo.component.scss'],
  providers: [BandinfoService]
})
export class BandinfoComponent implements OnInit {

  @Input() band;
  bandinfo;

  constructor(private bandinfoService: BandinfoService ) {
    
   }

  ngOnInit() {
    this.bandinfoService.getBand(this.band).subscribe(res => {
      this.bandinfo = res[0];
    // if (!this.bandinfo.img) 
    // this.bandinfo.img = 'http://www.loveknotweddingdirectory.com/wp-content/uploads/2017/04/bands_quotation_small.png';
    });
  }

}
