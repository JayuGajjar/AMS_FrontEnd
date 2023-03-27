import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalspareComponent } from './totalspare.component';

describe('TotalspareComponent', () => {
  let component: TotalspareComponent;
  let fixture: ComponentFixture<TotalspareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalspareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalspareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
