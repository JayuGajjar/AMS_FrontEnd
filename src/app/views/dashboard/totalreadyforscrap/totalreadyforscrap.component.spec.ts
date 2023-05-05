import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalreadyforscrapComponent } from './totalreadyforscrap.component';

describe('TotalreadyforscrapComponent', () => {
  let component: TotalreadyforscrapComponent;
  let fixture: ComponentFixture<TotalreadyforscrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalreadyforscrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalreadyforscrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
