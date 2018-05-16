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
      img : 'http://zk.fm/userdata/radio/1e26fb4a082d0c8118756e6a1a732abe.jpg',
      active : false
    },
    {
      id : 2,
      url : 'http://195.95.206.17/HitFM',
      name : 'Hit FM',
      performer_name : 'Киев',
      genre: 'radio' ,
      img : 'http://zk.fm/userdata/radio/20c36a401d69c001e5c39dccddc6a0d4.jpg',
      active : false
    },

    {
      id : 3,
      url : 'http://online-kissfm.tavrmedia.ua/KissFM',
      name : 'KISS FM',
      performer_name : 'Киев',
      genre: 'radio' ,
      img : 'http://zk.fm/userdata/radio/694e7fbc2a803dc542fc3796eae33983.jpg',
      active : false
    },

    {
      id : 4,
      url : 'http://icecastdc.luxnet.ua/lux',
      name : 'Lux FM',
      performer_name : 'Киев',
      genre: 'radio',
      img : 'http://zk.fm/userdata/radio/89a595c0e3a45971e7cdf51ef223a42d.jpg',
      active : false
    },
    {
      id : 5,
      url : 'http://online-radioroks.tavrmedia.ua:8000/RadioROKS',
      name : 'Radio Rock',
      performer_name : 'Киев',
      genre: 'radio',
      img : 'http://zk.fm/userdata/radio/4640d2aaa4b7666a9ec564380c8823cf.jpg',
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
