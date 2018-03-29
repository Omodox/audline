import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { TimePipe} from './audio/time.pipe';
import { SafePipe} from './audio/video.pipe';


import { AppComponent } from './app.component';
// import { PlayerComponent } from './player/player.component';
// import { PlaylistComponent } from './playlist/playlist.component';
import { BandsComponent } from './bands/bands.component';
import { MenuComponent } from './menu/menu.component';
import { BandComponent } from './band/band.component';
import { VideoComponent } from './video/video.component';
// import { AudioinfoComponent } from './audioinfo/audioinfo.component';
import { StreamComponent } from './stream/stream.component';
import { RoomComponent } from './stream/room/room.component';
import { AudiolistComponent } from './audiolist/audiolist.component';
import { AudioComponent } from './audio/audio.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    // PlayerComponent,
    // PlaylistComponent,
    BandsComponent,
    MenuComponent,
    BandComponent,
    VideoComponent,
    // AudioinfoComponent,
    TimePipe,
    SafePipe,
    StreamComponent,
    RoomComponent,
    AudiolistComponent,
    AudioComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
