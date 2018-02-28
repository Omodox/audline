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

  constructor( private videoService: VideoService ) { }

  ngOnInit() {
    this.videoService.getVideo().subscribe(res => {
      this.video = res });
  };

}

