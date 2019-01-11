import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';

import { PricesTableComponent } from './prices-table.component';

describe('PricesTableComponent', () => {
  let component: PricesTableComponent;
  let fixture: ComponentFixture<PricesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricesTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
