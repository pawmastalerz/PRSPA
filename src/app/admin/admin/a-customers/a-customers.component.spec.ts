import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACustomersComponent } from './a-customers.component';

describe('ACustomersComponent', () => {
  let component: ACustomersComponent;
  let fixture: ComponentFixture<ACustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
