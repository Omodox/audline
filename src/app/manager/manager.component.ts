import { Component, OnInit } from '@angular/core';
import { HttpManagerService } from './http-manager.service';
import { AudioService } from '../audio/audio.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
  providers: [HttpManagerService, AudioService]
})
export class ManagerComponent implements OnInit {

  audiolist;

  constructor(private httpManagerService: HttpManagerService,
    public audioService: AudioService) { }

  ngOnInit() {

    this.audioService.getManagerTrackList().subscribe(res => {

      this.audiolist = res;

    });

  }

}
