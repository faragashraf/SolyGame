import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwayDetectorComponent } from './sway-detector.component';

describe('SwayDetectorComponent', () => {
  let component: SwayDetectorComponent;
  let fixture: ComponentFixture<SwayDetectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwayDetectorComponent]
    });
    fixture = TestBed.createComponent(SwayDetectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
