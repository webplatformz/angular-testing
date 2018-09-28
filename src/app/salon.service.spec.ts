import { TestBed } from '@angular/core/testing';

import { SalonService } from './salon.service';

describe('SalonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalonService = TestBed.get(SalonService);
    expect(service).toBeTruthy();
  });
});
