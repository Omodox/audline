import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AudioService } from '../../audio/audio.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [AudioService]
})
export class ProfileComponent implements OnInit {

   audiolist ;

  constructor(private router: Router,private audioService: AudioService) { }


  sid = localStorage.getItem('sid');

  ngOnInit() {

    if (!this.sid) {
      this.router.navigate(['/login']);  
    }


    this.audioService.getMyPlaylist(this.sid).subscribe(res => {
      this.audiolist = res;});
  
  }

}

