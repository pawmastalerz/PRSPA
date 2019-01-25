import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACarDetailsComponent } from './a-car-details.component';

describe('ACarDetailsComponent', () => {
  let component: ACarDetailsComponent;
  let fixture: ComponentFixture<ACarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
