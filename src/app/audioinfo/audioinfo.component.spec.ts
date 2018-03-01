import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioinfoComponent } from './audioinfo.component';

describe('AudioinfoComponent', () => {
  let component: AudioinfoComponent;
  let fixture: ComponentFixture<AudioinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
