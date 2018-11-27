import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetTileComponent } from './fleet-tile.component';

describe('FleetTileComponent', () => {
  let component: FleetTileComponent;
  let fixture: ComponentFixture<FleetTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
