import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ACarsNewComponent } from './a-cars-new.component';

describe('ACarsNewComponent', () => {
  let component: ACarsNewComponent;
  let fixture: ComponentFixture<ACarsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ACarsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ACarsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
