import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumGameComponent } from './sum-game.component';

describe('SumGameComponent', () => {
  let component: SumGameComponent;
  let fixture: ComponentFixture<SumGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SumGameComponent]
    });
    fixture = TestBed.createComponent(SumGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
