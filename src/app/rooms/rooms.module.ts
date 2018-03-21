import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { FirstTestComponent } from './first-test/first-test.component';
import { RoomsRoutingModule } from './rooms.routing';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule
  ],
  declarations: [RoomsComponent, FirstTestComponent]
})
export class RoomsModule { }  
