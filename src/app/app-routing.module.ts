import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { PlaylistComponent } from './playlist/playlist.component';
import { BandsComponent } from './bands/bands.component';
import { BandComponent } from './band/band.component';
import { AudioComponent } from './audio/audio.component';
import { VideoComponent } from './video/video.component';
// import { TestModule } from './test/test.module';
// import { RoomsModule } from './rooms/rooms.module';
import { StreamComponent } from './stream/stream.component';
import { RoomComponent } from './stream/room/room.component';
import { LoginComponent } from './login/login.component';
import { SetsComponent } from './sets/sets.component';
import { ProfileComponent } from './login/profile/profile.component';
import { RegistrationComponent } from './login/registration/registration.component';
import { SearchComponent } from './search/search.component';
import { SetComponent } from './sets/set/set.component';

import { GoogleComponent } from './login/google/google.component';
import { RadioComponent } from './radio/radio.component';
import { TrackComponent } from './track/track.component';

const routes: Routes = [
  { path: '', component: AudioComponent },
  { path: 'bands', component: BandsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'video', component: VideoComponent },
  { path: 'google', component: GoogleComponent },
  // { path: 'search', component: PlaylistComponent},
  { path: 'performer/:id', component: BandComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sets', component: SetsComponent },
  { path: 'set/:id', component: SetComponent },
  { path: 'streams', component: StreamComponent},
  { path: 'stream/:id', component: RoomComponent },
  { path: 'radio', component: RadioComponent },
  { path: 'track/:id', component: TrackComponent }
  // { path: 'test', loadChildren: () => TestModule },
  // { path: 'rooms', loadChildren: () => RoomsModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
