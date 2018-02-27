import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { BandsComponent } from './bands/bands.component';
import { BandComponent } from './band/band.component';


const routes: Routes = [
  { path: '', component: PlaylistComponent },
  { path: 'bands', component: BandsComponent}
  { path: 'bands/:id', component: BandsComponent, children: BandComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
