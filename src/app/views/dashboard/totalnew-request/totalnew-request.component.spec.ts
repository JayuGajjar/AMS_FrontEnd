import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalnewRequestComponent } from './totalnew-request.component';

describe('TotalnewRequestComponent', () => {
  let component: TotalnewRequestComponent;
  let fixture: ComponentFixture<TotalnewRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalnewRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalnewRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
