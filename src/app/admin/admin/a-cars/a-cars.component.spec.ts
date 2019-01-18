import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACarsComponent } from './a-cars.component';

describe('ACarsComponent', () => {
  let component: ACarsComponent;
  let fixture: ComponentFixture<ACarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
