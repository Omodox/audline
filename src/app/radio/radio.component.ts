import { Component, OnInit } from '@angular/core';
import { HeartService } from '../audiolist/heart.service';


@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {


  constructor(private heartService : HeartService) { }


  radio = [
    {
      id : 1,
      url : 'http://cast.nrj.in.ua/nrj',
      name : 'NRJ',
      performer_name : 'Киев',
      genre: 'radio' ,
      img : 'http://nrj.ua/media/default/images/logo_v2.png',
      active : false
    },
    {
      id : 2,
      url : 'http://195.95.206.17/HitFM',
      name : 'Hit FM',
      performer_name : 'Киев',
      genre: 'radio' ,
      img : 'https://www.hitfm.ua/static/img/content/new_main/HitFM_logo.png',
      active : false
    },

    {
      id : 3,
      url : 'http://online-kissfm.tavrmedia.ua/KissFM',
      name : 'KISS FM',
      performer_name : 'Киев',
      genre: 'radio' ,
      img : 'http://auto-art.com.ua/image/cache/data/goods/music/kiss-fm-315x315.png',
      active : false
    },

    {
      id : 4,
      url : 'http://icecastdc.luxnet.ua/lux',
      name : 'Lux FM',
      performer_name : 'Киев',
      genre: 'radio',
      img : 'https://lux.fm/images/logo512.png',
      active : false
    }


    
  ];


  ngOnInit() {
  }

  radioPlay(item){
    this.heartService.track.emit(item);
    console.log(item);
    this.radio.forEach(element => {
      element.active = false;
    });
    item.active =   !item.active;
    
  }

}
