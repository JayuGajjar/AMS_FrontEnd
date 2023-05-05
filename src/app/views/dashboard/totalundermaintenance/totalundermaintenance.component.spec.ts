import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalundermaintenanceComponent } from './totalundermaintenance.component';

describe('TotalundermaintenanceComponent', () => {
  let component: TotalundermaintenanceComponent;
  let fixture: ComponentFixture<TotalundermaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalundermaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalundermaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
