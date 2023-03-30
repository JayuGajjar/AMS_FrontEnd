import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScrapComponent } from './add-scrap.component';

describe('AddScrapComponent', () => {
  let component: AddScrapComponent;
  let fixture: ComponentFixture<AddScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
