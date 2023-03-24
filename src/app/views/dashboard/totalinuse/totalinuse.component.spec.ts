import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalinuseComponent } from './totalinuse.component';

describe('TotalinuseComponent', () => {
  let component: TotalinuseComponent;
  let fixture: ComponentFixture<TotalinuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalinuseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalinuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
