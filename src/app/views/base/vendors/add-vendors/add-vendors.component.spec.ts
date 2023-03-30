import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorsComponent } from './add-vendors.component';

describe('AddVendorsComponent', () => {
  let component: AddVendorsComponent;
  let fixture: ComponentFixture<AddVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVendorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
