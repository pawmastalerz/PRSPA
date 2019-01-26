import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AUserDetailsComponent } from './a-user-details.component';

describe('AUserDetailsComponent', () => {
  let component: AUserDetailsComponent;
  let fixture: ComponentFixture<AUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
