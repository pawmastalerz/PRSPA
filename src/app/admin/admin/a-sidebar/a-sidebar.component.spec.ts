import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ASidebarComponent } from './a-sidebar.component';

describe('ASidebarComponent', () => {
  let component: ASidebarComponent;
  let fixture: ComponentFixture<ASidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ASidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ASidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
