import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { BandsComponent } from './bands/bands.component';
import { BandComponent } from './band/band.component';
import { VideoComponent } from './video/video.component';
import { TestModule } from './test/test.module';
import { RoomsModule } from './rooms/rooms.module';
import { StreamComponent } from './stream/stream.component';
import { RoomComponent } from './stream/room/room.component';


const routes: Routes = [
  { path: '', component: PlaylistComponent },
  { path: 'bands', component: BandsComponent },
  { path: 'video', component: VideoComponent },
  { path: 'search', component: PlaylistComponent},
  { path: 'band/:id', component: BandComponent },
  { path: 'streams', component: StreamComponent},
  { path: 'stream/:id', component: RoomComponent },
  { path: 'test', loadChildren: () => TestModule },
  { path: 'rooms', loadChildren: () => RoomsModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
