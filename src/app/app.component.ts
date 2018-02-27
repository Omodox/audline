import { Component, Output, OnInit, HostListener } from '@angular/core';
import { PlayerService } from './player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PlayerService]
})
export class AppComponent {

  constructor(private playerService: PlayerService ) { }


  // @HostListener('document:click', ['$event'])
  // onDocumentClicked(ev) {
  //   console.log('clicked', ev);
  // }

  ngOnInit() {

    //  this.playerService.audio.src= "lorem"; 
    // console.log(this.playerService.audio);
    
  }




}
