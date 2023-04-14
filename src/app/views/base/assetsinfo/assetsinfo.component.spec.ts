import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsinfoComponent } from './assetsinfo.component';

describe('AssetsinfoComponent', () => {
  let component: AssetsinfoComponent;
  let fixture: ComponentFixture<AssetsinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
