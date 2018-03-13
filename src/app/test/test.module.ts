import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { FirstTestComponent } from './first-test/first-test.component';
import { TestRoutingModule } from './test.routing';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule
  ],
  declarations: [TestComponent, FirstTestComponent]
})
export class TestModule { }
