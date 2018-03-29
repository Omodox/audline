import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';

import { FirstTestComponent } from './first-test/first-test.component';

import { RoomsRoutingModule } from './rooms.routing';


@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule
  ],
  declarations: [
    RoomsComponent,
     FirstTestComponent,
    
  ]
})
export class RoomsModule { }  
