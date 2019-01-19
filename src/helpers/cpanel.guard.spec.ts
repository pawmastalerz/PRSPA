import { TestBed, async, inject } from '@angular/core/testing';

import { CpanelGuard } from './cpanel.guard';

describe('CpanelGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpanelGuard]
    });
  });

  it('should ...', inject([CpanelGuard], (guard: CpanelGuard) => {
    expect(guard).toBeTruthy();
  }));
});
