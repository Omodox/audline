import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { BandsComponent } from './bands/bands.component';
import { MenuComponent } from './menu/menu.component';
import { BandComponent } from './band/band.component';
import { VideoComponent } from './video/video.component';
import { BandinfoComponent } from './bandinfo/bandinfo.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { AudioinfoComponent } from './audioinfo/audioinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlaylistComponent,
    BandsComponent,
    MenuComponent,
    BandComponent,
    VideoComponent,
    BandinfoComponent,
    LeftmenuComponent,
    AudioinfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
