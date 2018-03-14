import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test.component';
import { FirstTestComponent } from './first-test/first-test.component';

const routes: Routes = [
  { path: '', component: TestComponent, children: [
      {path: '', redirectTo: 'testtest'},
      {path: 'testtest', component: FirstTestComponent},
      {path: '**', redirectTo: 'testtest'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule { }

export const routedComponents = [TestComponent];