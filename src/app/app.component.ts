import { Component, Output, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( ) { }


  // @HostListener('document:click', ['$event'])
  // onDocumentClicked(ev) {
  //   console.log('clicked', ev);
  // }

  ngOnInit() {

    //  this.playerService.audio.src= "lorem"; 
    // console.log(this.playerService.audio);
    
  }




}
