import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalassetsComponent } from './totalassets.component';

describe('TotalassetsComponent', () => {
  let component: TotalassetsComponent;
  let fixture: ComponentFixture<TotalassetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalassetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalassetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
