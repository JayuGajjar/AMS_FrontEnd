import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalworkingComponent } from './totalworking.component';

describe('TotalworkingComponent', () => {
  let component: TotalworkingComponent;
  let fixture: ComponentFixture<TotalworkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalworkingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalworkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
