import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistComponent } from './playlist/playlist.component';
import { BandsComponent } from './bands/bands.component';

const routes: Routes = [
  { path: '', component: PlaylistComponent },
  { path: 'bands', component: BandsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
