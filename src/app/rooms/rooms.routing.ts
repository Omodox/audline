import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsComponent } from './rooms.component';
import { FirstTestComponent } from './first-test/first-test.component';

const routes: Routes = [
  { path: '', component: RoomsComponent, children: [
      {path: '', component: FirstTestComponent},
      {path: ':id', component: FirstTestComponent}
      // {path: '**', redirectTo: 'rooms'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsRoutingModule { }

export const routedComponents = [RoomsComponent];