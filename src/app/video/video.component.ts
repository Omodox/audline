import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers : [VideoService]

})
export class VideoComponent implements OnInit {

  video;
  videoUrl;

  constructor( private videoService: VideoService ) { }

  ngOnInit() {
    this.videoService.getVideo().subscribe(res => {
      this.video = res });
  };


  showVideo(url){
    if (url) this.videoUrl = 'https://www.youtube.com/embed/' + url + '?autoplay=1&rel=0';
    else this.videoUrl = '';
    
    let player = <any>document.getElementById('player');
    this.addtoPlayer(player.idt);
    
    //  else { this.videoUrl = url; }
    
    }
    

}

