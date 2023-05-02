import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalinprogressComponent } from './totalinprogress.component';

describe('TotalinprogressComponent', () => {
  let component: TotalinprogressComponent;
  let fixture: ComponentFixture<TotalinprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalinprogressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
